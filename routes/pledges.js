var express = require('express');
var config = require('../config/config');
var MongoCache = require('../util/mongo-cache');
var PledgesController = require('../controllers/pledges-controller');
var PledgeService = require('../services/pledge-service');
var router = express.Router();

/** 
 * Finds the total number of pledges that were made yesterday
 **/
router.get('/', (req, res) => {
  if (req.query['total'] != undefined) {
    var mongoCache = new MongoCache();
    mongoCache.getDb(config.mongo.connectionString).then(  (db) => {
      var pledgeService = new PledgeService(db);
      var pledgesController = new PledgesController(pledgeService);
      pledgesController.getTotalPledges(req, res);
    }).catch( (e) => {
      res.status(500).send(e.toString());
    });
  } else { 
    if (req.query['date'] == undefined) {
      res.status(500).send('{"message":"No date specified","error":{"status":500}}');
    } else {
      var mongoCache = new MongoCache();
      mongoCache.getDb(config.mongo.connectionString).then(  (db) => {
        var pledgeService = new PledgeService(db);
        var pledgesController = new PledgesController(pledgeService);
        pledgesController.getPledgesByDay(req, res);
      }).catch( (e) => {
        res.status(500).send(e.toString());
      });
  
    }
  }

});

router.put('/:id', (req, res) => {
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
