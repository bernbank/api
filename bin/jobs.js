var moment = require('moment');
var CronJob = require('cron').CronJob;
var config = require('../config/config');
var MongoCache = require('../util/mongo-cache');
var BerniePbClient = require('../api_clients/bernie-pb-client');
var DailyCallLogService = require('../services/daily-call-log-service');
var PledgeService = require('../services/pledge-service');

module.exports = {
    setupJobs: () => {
        new CronJob('00 00 12 * * *', () => {  // Every day at noon
            var mongoCache = new MongoCache();
            mongoCache.getDb(config.mongo.connectionString).then((db) => {
                var berniePbClient = new BerniePbClient();
                var yesterday = moment().subtract(1, 'day').toDate();
                var dailyCallLogService = new DailyCallLogService(db, berniePbClient);
                dailyCallLogService.saveDailyCallLog(yesterday).then(() => {
                    console.log('Successfully saved daily call log');
                }).catch((err) => {
                    console.error('Failed to save daily call log');
                    console.error(err.stack);
                })
            }).catch((err) => {
                console.error('Failed to get mongo db connection');
                console.error(err.stack);
            });
        }, null, true, 'America/Detroit', null, true);


        /*
        //NOTE: If we change what day this job runs on, we need to update /dailyCallLogs/currentWeekTotal as well
        new CronJob('00 00 21 * * 4', () => {  //Every Thursday at 9pm
            var mongoCache = new MongoCache();
            mongoCache.getDb(config.mongo.connectionString).then((db) => {
                var pledgeService = new PledgeService(db);
                var berniePbClient = new BerniePbClient();
                var dailyCallLogService = new DailyCallLogService(db, berniePbClient);

                var startDate = moment().subtract(7, 'days').toDate();
                var endDate = new Date();
                dailyCallLogService.getTotalCallersForDateRange(startDate, endDate).then((totalCallers) => {
                    pledgeService.getDonated().then((donated) => {
                       pledgeService.sendWeeklyEmailToPledges(totalCallers,donated).then(() => {
                           console.log("Successfully attempted to send all weekly donation reminder emails");
                       }).catch((err) => {
                           console.error('Failed to send one or more weekly pledge emails');
                           console.error(err.stack);
                       });
                    }).catch((err) => {
                    console.error('Failed to fetch donations from ActBlue');
                    console.error(err.stack);                       
                    });
                }).catch((err) => {
                    console.error('Failed to fetch total callers for last week');
                    console.error(err.stack);
                });
            }).catch((err) => {
                console.error('Failed to get mongo db connection');
                console.error(err.stack);
            });
        }, null, true, 'America/Detroit', null, false);
        */
        
        
    }
};
