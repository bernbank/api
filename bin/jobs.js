var moment = require('moment');
var CronJob = require('cron').CronJob;
var config = require('../config/config');
var MongoCache = require('../util/mongo-cache');
var BerniePbClient = require('../api_clients/bernie-pb-client');
var DailyCallLogService = require('../services/daily-call-log-service');
var ses = require('node-ses');
var pug = require('pug');

module.exports = {
    setupJobs: () => {
        new CronJob('00 00 12 * * *', () => {
            var mongoCache = new MongoCache();
            mongoCache.getDb(config.mongo.connectionString).then((db) => {
                var berniePbClient = new BerniePbClient();
                var yesterday = moment().subtract(1, 'day').toDate();
                var dailyCallLogService = new DailyCallLogService(db, berniePbClient);
                dailyCallLogService.saveDailyCallLog(yesterday).then(() => {
                    console.log('Saved daily call log');
                }).catch((err) => {
                    console.error('Failed to save daily call log');
                    console.error(err.stack);
                })
            }).catch((err) => {
                console.error('Failed to get mongo db connection');
                console.error(err.stack);
            });
        }, null, true, 'America/Detroit', null, true);


        new CronJob('', () => {
            if (false) {
                var client = ses.createClient(config.amazonSES);

                var strTemplateHTML = pug.renderFile('./views/email-html.pug', data);
                var strTemplateTEXT = pug.renderFile('./views/email-text.pug', data);
                var objEmail = {
                    to: data.email,
                    from: 'no-reply@bernbank.com',
                    subject: 'BernBank Donation Reminder',
                    message: strTemplateHTML,
                    altText: strTemplateTEXT
                };

                client.sendEmail(objEmail, (err, data, res) => {
                    //console.log("EMAIL SENT!!!");
                });
            }
        }, null, true, 'America/Detroit', null, true);
    }
};