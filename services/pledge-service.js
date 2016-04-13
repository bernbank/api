'use strict';

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

class PledgeService {

    constructor(url) {
        this.url = url;
    }
    createPledge(pledge) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, function(err, db){
                var pledges = db.collection('pledges');
                pledges.insertOne(pledge, function(err, record){
                    db.close();
                    resolve(record.ops[0]);
                });
            });
        });
    }

    getPledge(id) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, function (err, db) {
                var pledges = db.collection('pledges');
                pledges.find({"_id": new ObjectId(id)}).limit(1).next(function(err, doc){
                    db.close();
                    resolve(doc);
                });
            });
        });
    }

    deletePledge(id) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, function (err, db) {
                var pledges = db.collection('pledges');
                pledges.deleteOne({"_id": new ObjectId(id)}, function(err, result){
                    db.close();
                    resolve();
                });
            });
        });
    }
}

module.exports = PledgeService;