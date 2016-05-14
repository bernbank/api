/*
    Actions are endpoints that don't fit the definition of a RESTful API.  These should be limited to special cases.
    Example: Using a GET (instead of PUT or PATCH) request from an email link to update an existing database entry
 */


var express = require('express');
var config = require('../config/config');
var MongoCache = require('../util/mongo-cache');
var PledgesController = require('../controllers/pledges-controller');
var PledgeService = require('../services/pledge-service');

var router = express.Router();

router.get('/unsubscribe/:email',  (req, res) => {

    var mongoCache = new MongoCache();
    mongoCache.getDb(config.mongo.connectionString).then((db) => {
        var pledgeService = new PledgeService(db);
        var pledgesController = new PledgesController(pledgeService);
        pledgesController.unsubscribeFromEmails(req, res);
    }).catch((e) => res.status(500).send(e.toString()));

});