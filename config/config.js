'use strict'

module.exports = {
    mongo: {
        connectionString: 'mongodb://localhost:27017/berniebank'
    },
    callThreshold: 30,
    nodeCache: { stdTTL: 600, checkperiod: 605 } ,
    amazonSES: { key: process.env.SES_KEY, secret: process.env.SES_SECRET }
};
