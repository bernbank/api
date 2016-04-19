'use strict';

var express = require('express');
var config = require('../config/config');
var MongoCache = require('../util/mongo-cache');
var BerniePbClient = require('../api_clients/bernie-pb-client');
var DailyCallLogsController = require('../controllers/daily-call-logs-controller');
var DailyCallLogService = require('../services/daily-call-log-service');
var router = express.Router();

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