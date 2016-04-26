'use strict';
var precond = require('precond');
var validator = require('validator');
var moment = require('moment');

class PledgeService {

    constructor(db) {
        this.pledges = db.collection('pledges');
    }

    createPledge(pledge) {
        return new Promise((resolve, reject) => {

            precond.checkArgument(pledge, 'Pledge cannot be null or undefined');
            precond.checkArgument(typeof pledge === 'object' && !Array.isArray(pledge), 'Pledge must be an object');
            precond.checkArgument(Object.keys(pledge).length > 0, 'Pledge cannot be empty');
            precond.checkArgument(pledge.email, 'Pledge must have an associated email property');
            precond.checkArgument(validator.isEmail(pledge.email), 'Pledge must have a valid formatted email address');
	    pledge.added = new Date();

            this.pledges.insertOne(pledge).then(function (record) {
                resolve(record.ops[0]);
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
                resolve( {"total": totalPledges}  );
              }
          });
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
