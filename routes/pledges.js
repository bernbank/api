var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/berniebank';

router.post('/', function(req, res){
  MongoClient.connect(url, function(err, db){
    var pledges = db.collection('pledges');
    pledges.insertOne(req.body, function(err, record){
      res.json(record.ops[0]);
      db.close();
    });
  });
});

router.get('/:id', function(req, res) {
  MongoClient.connect(url, function (err, db) {
    var pledges = db.collection('pledges');
    pledges.find({"_id": new ObjectId(req.params.id)}).limit(1).next(function(err, doc){
      res.json(doc);
      db.close();
    });
  });
});

router.delete('/:id', function(req, res) {
  MongoClient.connect(url, function (err, db) {
    var pledges = db.collection('pledges');
    pledges.deleteOne({"_id": new ObjectId(req.params.id)}, function(err, result){
      res.status(204).send();
      db.close();
    });
  });
});

module.exports = router;
