'use strict'
var fs = require('fs');
var userHome = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var sesConfig = JSON.parse(fs.readFileSync(userHome + '/aws-ses-config.json'));
sesConfig.amazon = 'https://email.us-west-2.amazonaws.com';

module.exports = {
    mongo: {
        connectionString: 'mongodb://localhost:27017/berniebank'
    },
    callThreshold: 30,
    nodeCache: { stdTTL: 600, checkperiod: 605 } ,
    amazonSES: sesConfig
};
