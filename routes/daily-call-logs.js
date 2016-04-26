'use strict';

var express = require('express');
var config = require('../config/config');
var MongoCache = require('../util/mongo-cache');
var BerniePbClient = require('../api_clients/bernie-pb-client');
var DailyCallLogsController = require('../controllers/daily-call-logs-controller');
var DailyCallLogService = require('../services/daily-call-log-service');
var router = express.Router();

router.get('/total', (req,res) => { 
    if (req.query['date'] == undefined ) {
        // Getting all date totals
        var mongoCache = new MongoCache();
        mongoCache.getDb(config.mongo.connectionString).then((db) => {
            var berniePbClient = new BerniePbClient();
            var dailyCallLogsService = new DailyCallLogService(db, berniePbClient);
            var dailyCallLogsController = new DailyCallLogsController(dailyCallLogsService);
            dailyCallLogsController.getAllTimeTotal(req, res);
        }).catch((e) => res.status(500).send(e.toString()));
    } else {
        // Getting totals from a given date
	console.log("Getting totals from a given date");
        var mongoCache = new MongoCache();
        mongoCache.getDb(config.mongo.connectionString).then((db) => {
            var berniePbClient = new BerniePbClient();
            var dailyCallLogsService = new DailyCallLogService(db, berniePbClient);
            var dailyCallLogsController = new DailyCallLogsController(dailyCallLogsService);
            //dailyCallLogsController.createDailyCallLog(req, res);
        }).catch((e) => res.status(500).send(e.toString()));

    }
});

router.put('/:date', (req, res) => {
    var mongoCache = new MongoCache();
    mongoCache.getDb(config.mongo.connectionString).then((db) => {
        var berniePbClient = new BerniePbClient();
        var dailyCallLogsService = new DailyCallLogService(db, berniePbClient);
        var dailyCallLogsController = new DailyCallLogsController(dailyCallLogsService);
        dailyCallLogsController.createDailyCallLog(req, res);
    }).catch((e) => res.status(500).send(e.toString()));
});

module.exports = router;
