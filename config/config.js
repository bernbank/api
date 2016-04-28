'use strict'

module.exports = {
    mongo: {
        connectionString: 'mongodb://localhost:27017/berniebank'
    },
    callThreshold: 50,
    nodeCache: { stdTTL: 600, checkperiod: 605 } ,
};
