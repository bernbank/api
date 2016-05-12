'use strict';
var precond = require('precond');
var validator = require('validator');
var moment = require('moment');
var config = require('../config/config');
var NodeCache = require('node-cache');
var simpleNodeCache = new NodeCache(config.nodeCache);

class PledgeService {

    constructor(db) {
        this.pledges = db.collection('pledges');
        this.mailing = db.collection('mailinglist');
    }


    /**
     * Creates a new pledge in the Database
     **/
    createPledge(pledge) {
        return new Promise((resolve, reject) => {

            precond.checkArgument(pledge, 'Pledge cannot be null or undefined');
            precond.checkArgument(typeof pledge === 'object' && !Array.isArray(pledge), 'Pledge must be an object');
            precond.checkArgument(Object.keys(pledge).length > 0, 'Pledge cannot be empty');
            precond.checkArgument(pledge.email, 'Pledge must have an associated email property');
            precond.checkArgument(validator.isEmail(pledge.email), 'Pledge must have a valid formatted email address');
            precond.checkArgument(pledge.amount, 'Pledge amount must be present');
            precond.checkArgument(validator.isInt(pledge.amount + "", {min:1, max:10000}), 'Pledge amout must be an integer between 1 and 10000');
           
            pledge.added = new Date();

            var query = {
                'email' : pledge.email,
            }
            // Adding pledge email to mailing list
            this.mailing.find(query , (err, thing) => {
                
                if (err == null) {
                    var nTotal = 0;
                    var email = { email: pledge.email , active: true} ;
                    thing.each( (err, doc) => {
                        if (doc == null) {
                            if (nTotal == 0) {
                                // This is a new email, we add it to mailing list
                                this.mailing.insertOne(email, (err, result) => {
                                    // Inserted email successfully or not
                                });
                            } else {
                                // Email already exists
                            }
                        } else {
                            // Email already exists
                            nTotal += 1;
                        }
                    });
                }
                
            });

            var query = {
                'email' : pledge.email,
            }
            this.pledges.update(query, pledge,  {upsert:true} ).then((record) => {
                var prom = this.getPledge(pledge.email);
                prom.then((data) => {
                    resolve(data);
                }).catch((e) => {
                    reject(e);
                });
            }).catch((err) => {
                reject(err);
            });

        });
    }

    getPledge(id) {
        return new Promise((resolve, reject) => {
            this.pledges.find({"email": id}).limit(1).next().then(function (doc) {
                resolve(doc);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * Gets the total number of pledges from yesterday.
     **/
    getPledgesByDay(strDate) {
      return new Promise((resolve, reject) => {
        simpleNodeCache.get("pledges-day-" + strDate, (err, value) => {
          if (!err) {
            if (value != undefined) {
              resolve(value);
            } else {

              var desiredDateStart = moment(strDate, "YYYYMMDD").startOf('day').toDate();
              var desiredDateEnd = moment(strDate, "YYYYMMDD").endOf('day').toDate();
              var query = {
                'added' : {"$gte" : desiredDateStart, '$lte' : desiredDateEnd  }
              };
              var pledges = [];
              var totalPledges = 0;
   
              this.pledges.find(query, (err,thing) => {
                  thing.each( (err, doc) => {
                    if (doc != null) {
                      pledges.push(doc);
                      totalPledges += 1;
                    } else {
                      simpleNodeCache.set("pledges-day-" + strDate, {"total": totalPledges},  (err, success) => {
                      });
                      resolve( {"total": totalPledges}  );
                    }
                });
              });

            }
          }
        });

      });
    }


    /**
     * Gets the total number of pledges from all time
     **/
    getTotalPledges() {
      return new Promise((resolve, reject) => {

        simpleNodeCache.get("pledges-total", (err, value) => {
          if (!err) {
            if (value != undefined) {
              resolve(value);
            } else {
              var totalPledges = 0;
              var totalAmount = 0;
              this.pledges.find({}, (err,thing) => {
                  thing.each( (err, doc) => {
                      if (doc != null) {
                          totalPledges += 1;
                          if (validator.isInt( doc['amount'] + "")) {
                              totalAmount += parseInt(doc['amount']);
                          } else {
                              totalAmount += 1;
                          }
                      } else {
                          simpleNodeCache.set("pledges-total", {"total": totalPledges, "amount": totalAmount} ,  (err, success) => {});
                          resolve( {"total": totalPledges, "amount": totalAmount}  );
                      }
                  });
              });

            }
          }
        });
 
      });
    }


    /**
     * Gets the historic pledges per day from all time.
     **/
    getHistoricPledges() {
      return new Promise((resolve, reject) => {
        simpleNodeCache.get("pledges-historic", (err, value) => {
          if (!err) {
            if (value != undefined) {
              resolve(value);
            } else {

              var historicData = [];
              var dictDates = {};
              this.pledges.find({}, (err,thing) => {
                  thing.each( (err, doc) => {
                      if (doc != null) {
                          var stringDate = moment(doc['added']).format("YYYY-MM-DD");
                          if (dictDates[stringDate] == undefined) {
                              dictDates[stringDate] = {total:1, amount: doc['amount'] , date:stringDate };
                          } else {
                              dictDates[stringDate]['total'] += 1;
                              if (doc['amount'] == undefined) {
                                  dictDates[stringDate]['amount'] += 1;
                              } else {
                                  dictDates[stringDate]['amount'] += doc['amount'];
                              }
                          }
                      } else {
                          for (var key in dictDates) {
                              historicData.push(dictDates[key]);
                          }
                          simpleNodeCache.set("pledges-historic", historicData  ,  (err, success) => {});
                          resolve(  historicData  );
                      }
                  });
              });



            }
          }
        });


      });
    }


    deletePledge(id) {
        return new Promise((resolve, reject) => {
            this.pledges.deleteOne({"email": id}).then(function (result) {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

module.exports = PledgeService;
