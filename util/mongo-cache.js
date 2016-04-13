'use strict';
var MongoClient = require('mongodb').MongoClient;

var cachedDbs = new Map();

class MongoCache {

    getDb(url) {
        return new Promise(function (resolve, reject) {
            var cachedDb = cachedDbs.get(url);
            if (typeof cachedDb !== 'undefined') {
                return resolve(cachedDb);
            }

            MongoClient.connect(url, function (err, db) {
                if (err) {
                    reject(err);
                }
                cachedDbs.set(url, db);
                resolve(db);
            });
        });
    }
}

module.exports = MongoCache;
