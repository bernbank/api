var express = require('express');
var config = require('../config/config');
var MongoCache = require('../util/mongo-cache');
var PledgesController = require('../controllers/pledges-controller');
var PledgeService = require('../services/pledge-service');
var router = express.Router();

router.post('/', (req, res) => {
  var mongoCache = new MongoCache();
  mongoCache.getDb(config.mongo.connectionString).then((db) => {
    var pledgeService = new PledgeService(db);
    var pledgesController = new PledgesController(pledgeService);
    pledgesController.createPledge(req, res);
  }).catch((e) => res.status(500).send(e.toString()));
});

router.get('/:id', (req, res) => {
  var mongoCache = new MongoCache();
  mongoCache.getDb(config.mongo.connectionString).then((db) => {
    var pledgeService = new PledgeService(db);
    var pledgesController = new PledgesController(pledgeService);
    pledgesController.getPledge(req, res);
  }).catch((e) => res.status(500).send(e.toString()));
});

router.delete('/:id', (req, res) => {
  var mongoCache = new MongoCache();
  mongoCache.getDb(config.mongo.connectionString).then((db) => {
    var pledgeService = new PledgeService(db);
    var pledgesController = new PledgesController(pledgeService);
    pledgesController.deletePledge(req, res);
  }).catch((e) => res.status(500).send(e.toString()));
});

module.exports = router;
