var express = require('express');
var config = require('../config/config');
var MongoCache = require('../util/mongo-cache');
var MailingController = require('../controllers/mailing-controller');
var MailingService = require('../services/mailing-service');

var router = express.Router();

/** 
 * Returns all active emails that we are going to send emails to.
 **/
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

/**
 * Allows you to insert a bulk of emails into the database.
 **/
router.put('/', (req, res) => {
  
  /*
  var mongoCache = new MongoCache();
  mongoCache.getDb(config.mongo.connectionString).then((db) => {
    var pledgeService = new PledgeService(db);
    var pledgesController = new PledgesController(pledgeService);
    pledgesController.createPledge(req, res);
  }).catch((e) => res.status(500).send(e.toString()));
  */
  
});


/**
 * (Soft) deletes en email from the database.
 **/
router.delete('/:email', (req, res) => {
  /*
  var mongoCache = new MongoCache();
  mongoCache.getDb(config.mongo.connectionString).then((db) => {
    var pledgeService = new PledgeService(db);
    var pledgesController = new PledgesController(pledgeService);
    pledgesController.deletePledge(req, res);
  }).catch((e) => res.status(500).send(e.toString()));
  */
});


/**
 * Sends an email to all users
 **/
router.post('/', (req, res) => {
  
  console.log("___ helooooooooO _________");
  
  /*
  var mongoCache = new MongoCache();
  mongoCache.getDb(config.mongo.connectionString).then((db) => {
    var pledgeService = new PledgeService(db);
    var pledgesController = new PledgesController(pledgeService);
    pledgesController.deletePledge(req, res);
  }).catch((e) => res.status(500).send(e.toString()));
  */
  
  var ses = require('node-ses');
  
  console.log("AFTER REQUIRE!!!");
  
  var client = ses.createClient({ key: 'key', secret: 'secret' });
  
  
  var strTemplateHTML = 'your <b>message</b> goes here' ;
  var strTemplateTEXT = 'your messagegoes here' ;
 
  var objEmail =  {
    to: 'b1@gmail.com',
    from: 'codeispoetry2@gmail.com',
    subject: 'Support bernie!!',
    message: strTemplateHTML,
    altText: strTemplateTEXT
  };
  
  
  console.log(objEmail);
  
  /*
  client.sendEmail(objEmail, function (err, data, res) {
    console.log("ERROR");
    console.log(err);
    console.log("DATA");
    console.log(data);
    
  });
  */
  
  res.status(200).send('All good!!!');
  
});



module.exports = router;
