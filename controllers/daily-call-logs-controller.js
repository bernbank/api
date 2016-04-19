'use strict';

var moment = require('moment');

class DailyCallLogsController {

    constructor(dailyCallLogService) {
        this.dailyCallLogService = dailyCallLogService;
    }

    createDailyCallLog(req, res) {
        var dateString = req.params.date;
        var date = moment(dateString, 'YYYY-MM-DD').toDate();
        this.dailyCallLogService.saveDailyCallLog(date).then(() => {
            res.status(204).send();
        }).catch((e) => {
            res.status(500).send(e)
        });
    }
}

module.exports = DailyCallLogsController;