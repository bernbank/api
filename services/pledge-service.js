'use strict';

var ObjectId = require('mongodb').ObjectID;

class PledgeService {

    constructor(db) {
        this.pledges = db.collection('pledges');
    }

    createPledge(pledge) {
        return new Promise((resolve, reject) => {
            this.pledges.insertOne(pledge).then(function (record) {
                resolve(record.ops[0]);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getPledge(id) {
        return new Promise((resolve, reject) => {
            this.pledges.find({"_id": new ObjectId(id)}).limit(1).next().then(function (doc) {
                resolve(doc);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    deletePledge(id) {
        return new Promise((resolve, reject) => {
            this.pledges.deleteOne({"_id": new ObjectId(id)}).then(function (result) {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

module.exports = PledgeService;