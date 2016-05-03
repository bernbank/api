'use strict';
var moment = require('moment');
var config = require('../config/config');
var NodeCache = require('node-cache');
var simpleNodeCache = new NodeCache(config.nodeCache);


class DailyCallLogService {
    constructor(db, berniePbClient) {
        this.dailyCallLogs = db.collection('dailyCallLog');
        this.berniePbClient = berniePbClient;
    }

    saveDailyCallLog(date) {
        return new Promise((resolve, reject) => {
            var dateString = moment(date).format('YYYY-MM-DD');
            this.berniePbClient.getCallersAboveThresholdByDate(dateString, config.callThreshold).then((callers) => {
                var dailyCallLog = {
                    date: dateString,
                    total: callers.length,
                    callers: callers
                };
                this.dailyCallLogs.update({date: dateString} , dailyCallLog , {upsert: true}).then(() => {
                    resolve();
                }).catch(reject);
            }).catch(reject);
        });
    }

    getAllTimeTotal() {
        return new Promise((resolve, reject) => {

            simpleNodeCache.get("dailycall-alltime", (err, value) => {
                if (!err) {
                    if (value != undefined) {
                        resolve(value);
                    } else {

                        this.dailyCallLogs.find({}, {_id: true, date:true, total:true} , (err, thing) => {
                            if (err != null) {
                                 // There was an error, let's report it
                                reject(e);
                            }
                            var output = { total: 0 , data: [] };
                            thing.each( (err,doc) => {
								
								if (err != null) {
									 // There was an error, let's report it
									reject(err);
								}
								
                                if (doc != null) {
                                    output['total'] += doc['total'];
                                    output['data'].push(doc);
                                } else {
                                    simpleNodeCache.set("dailycall-alltime", output ,  (err, success) => {});
                                    resolve(output);
                                }
                            });
                        });

                    }
                }
            });


        });
    }

    getTotalByDate(date) {
        return new Promise((resolve, reject) => {
            var dateString = moment(date).format('YYYY-MM-DD');
            simpleNodeCache.get("dailycall-totaldate-" + dateString, (err, value) => {
                if (!err) {
                    if (value != undefined) {
                        resolve(value);
                    } else {

                        var query = {
                            date: dateString
                        };
                        var output = {};
                        this.dailyCallLogs.find(query, {_id: true, date:true, total:true}, (err, thing) =>  {
                            if (err != null) {
                                // There was an error, let's report it
                                reject(e);
                            }
                            thing.each( (err,doc) => {
                                if (doc != null) {
                                    output = doc;
                                } else {
                                    simpleNodeCache.set( "dailycall-totaldate-" + dateString, output ,  (err, success) => {}); 
                                    resolve(output);
                                }
                            });
                        });

                    }
                }
            });



        });
    }

}

module.exports = DailyCallLogService;
