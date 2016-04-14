'use strict';
var precond = require('precond');
var validator = require('validator');

class PledgeService {

    constructor(db) {
        this.pledges = db.collection('pledges');
    }

    createPledge(pledge) {
        return new Promise((resolve, reject) => {

            precond.checkArgument(pledge, 'Pledge cannot be null or undefined');
            precond.checkArgument(typeof pledge === 'object' && !Array.isArray(pledge), 'Pledge must be an object');
            precond.checkArgument(Object.keys(pledge).length > 0, 'Pledge cannot be empty');
            precond.checkArgument(pledge.email, 'Pledge must have an associated email property');
            precond.checkArgument(validator.isEmail(pledge.email), 'Pledge must have a valid formatted email address');

            this.pledges.insertOne(pledge).then(function (record) {
                resolve(record.ops[0]);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getPledge(id) {
        return new Promise((resolve, reject) => {
            this.pledges.find({"email": id}).limit(1).next().then(function (doc) {
                resolve(doc);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    deletePledge(id) {
        return new Promise((resolve, reject) => {
            this.pledges.deleteOne({"email": id}).then(function (result) {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

module.exports = PledgeService;