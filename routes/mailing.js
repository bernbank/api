var express = require('express');
var config = require('../config/config');
var MongoCache = require('../util/mongo-cache');
var MailingController = require('../controllers/mailing-controller');
var MailingService = require('../services/mailing-service');

var router = express.Router();

/**
 * Sends an email to all users
 **/
router.get('/send', (req, res) => {
  var mongoCache = new MongoCache();
  mongoCache.getDb(config.mongo.connectionString).then(  (db) => {
    var mailingService = new MailingService(db);
    var mailingController = new MailingController(mailingService);
    mailingController.sendEmails(req, res);
  }).catch( (e) => {
    res.status(500).send(e.toString());
  });
  
});



/** 
 * Returns all active emails that we are going to send emails to.
 **/
/*
router.get('/', (req, res) => {
  
  var mongoCache = new MongoCache();
  mongoCache.getDb(config.mongo.connectionString).then(  (db) => {
    var mailingService = new MailingService(db);
    var mailingController = new MailingController(mailingService);

    mailingController.getActiveEmails(req, res);
  }).catch( (e) => {
    res.status(500).send(e.toString());
  });
  

});
*/

/**
 * Allows you to insert a bulk of emails into the database.
 **/
router.post('/', (req, res) => {

  var mongoCache = new MongoCache();
  mongoCache.getDb(config.mongo.connectionString).then((db) => {
    var mailingService = new MailingService(db);
    var mailingController = new MailingController(mailingService);
    mailingController.insertEmails(req, res);
  }).catch((e) => {
    res.status(500).send(e.toString()) ;
  });
  
});


/**
 * (Soft) deletes en email from the  mailinglist collection
 **/
router.delete('/:email', (req, res) => {

  var mongoCache = new MongoCache();
  mongoCache.getDb(config.mongo.connectionString).then((db) => {
    var mailingService = new MailingService(db);
    var mailingController = new MailingController(mailingService);
    mailingController.deleteEmail(req, res);
  }).catch((e) => res.status(500).send(e.toString()));
  
});





module.exports = router;
