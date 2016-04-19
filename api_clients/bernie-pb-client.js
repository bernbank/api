'use strict';

var request = require('request');

var rootApiUrl = "http://www.berniepb.com/api";

class BerniePbClient {

    getCallersAboveThresholdByDate(date, threshold) {
        return new Promise((resolve, reject) => {
            var endpointUrl = rootApiUrl + '/get_top_callers?thresh=' + threshold + '&date=' + date;
            request(endpointUrl, function (error, response, body) {
                if (error) {
                    return reject(error);
                }

                if (response.statusCode !== 200) {
                    var invalidResponseError = new Error('API returned an unexpected response status code: ' + response.statusCode);
                    return reject(invalidResponseError);
                }

                var json = JSON.parse(body);
                resolve(json);
            });
        });
    }
}

module.exports = BerniePbClient;