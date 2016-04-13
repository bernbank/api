'use strict';

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

class PledgeService {

    constructor(url) {
        this.url = url;
    }

    createPledge(pledge) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url).then(function(db){
                var pledges = db.collection('pledges');
                pledges.insertOne(pledge).then(function(record){
                    resolve(record.ops[0]);
                    db.close();
                }).catch((err) => {
                    reject(err);
                    db.close();
                });
            }).catch(reject);
        });
    }

    getPledge(id) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url).then(function (db) {
                var pledges = db.collection('pledges');
                pledges.find({"_id": new ObjectId(id)}).limit(1).next().then(function(doc){
                    resolve(doc);
                    db.close();
                }).catch((err) => {
                    reject(err);
                    db.close();
                });
            }).catch(reject);
        });
    }

    deletePledge(id) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url).then(function (db) {
                var pledges = db.collection('pledges');
                pledges.deleteOne({"_id": new ObjectId(id)}).then(function(result){
                    resolve();
                    db.close();
                }).catch((err) => {
                    reject(err);
                    db.close();
                });
            }).catch(reject);
        });
    }
}

module.exports = PledgeService;