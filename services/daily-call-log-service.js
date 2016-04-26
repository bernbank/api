'use strict';
var moment = require('moment');
var config = require('../config/config');

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
            this.dailyCallLogs.find({}, {_id: true, date:true, total:true} , (err, thing) => {
                if (err != null) {
                    // There was an error, let's report it
                    reject(e);
                }
                var output = { total: 0 , data: [] };
                thing.each( (err,doc) => {
                    if (doc != null) {
                        output['total'] += doc['total'];
                        output['data'].push(doc);
                    } else {
                        resolve(output);
                    }
                });
            });
        });
    }

    getTotalByDate(date) {
        return new Promise((resolve, reject) => {
            var dateString = moment(date).format('YYYY-MM-DD');
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
                        resolve(output);
                    }
                });
            });

        });
    }

}

module.exports = DailyCallLogService;
