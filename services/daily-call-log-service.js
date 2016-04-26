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
                    callers: callers
                };
                this.dailyCallLogs.update({date: dateString} , dailyCallLog , {upsert: true}).then(() => {
                    resolve();
                }).catch(reject);
            }).catch(reject);
        });
    }
}

module.exports = DailyCallLogService;
