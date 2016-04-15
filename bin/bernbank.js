#!/usr/bin/env node
var process = require('process');
var app = require('../app');
var http = require('http');
var moment = require('moment');
var CronJob = require('cron').CronJob;
var config = require('../config/config');
var MongoCache = require('../util/mongo-cache');
var BerniePbClient = require('../api_clients/bernie-pb-client');
var DailyCallLogService = require('../services/daily-call-log-service');

new CronJob('00 00 12 * * *', function () {
    var mongoCache = new MongoCache();
    mongoCache.getDb(config.mongo.connectionString).then((db) => {
        var berniePbClient = new BerniePbClient();
        var yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
        berniePbClient.getCallersAboveThresholdByDate(yesterday, config.callThreshold).then((callers) => {
            console.log('Successfully fetched callers above threshold by date');
            var dailyCallLogService = new DailyCallLogService(db);
            dailyCallLogService.saveDailyCallLog(callers).then(() => {
                console.log('Saved daily call log');
            }).catch((err) => {
                console.error('Failed to save daily call log');
                console.error(err.stack);
            })
        }).catch((err) => {
            console.error('Failed to fetch callers above threshold by date');
            console.error(err.stack);
        });
    }).catch((err) => {
        console.error('Failed to get mongo db connection');
        console.error(err.stack);
    });
}, null, true, 'America/Detroit', null, true);

var server = http.createServer(app);
server.listen(process.env.PORT || 3000);
