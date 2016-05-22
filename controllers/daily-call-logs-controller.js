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

    /**
     * Gets the total number of ringmakers of all time
     **/
    getAllTimeTotal(req, res) {
       this.dailyCallLogService.getAllTimeTotal().then( (data) => {
            res.status(200).send(data);
       }).catch((e) => {
           res.status(500).send(e);
       });
    }
    /**
     * Gets the total number of ringmakers for a specific date
     **/
     getTotalByDate(req, res) {
         var dateString = req.query.date;
         var date = moment(dateString, 'YYYY-MM-DD').toDate();
         this.dailyCallLogService.getTotalByDate(date).then( (data) => {
             res.status(200).send(data);
          }).catch((e) => {
             res.status(500).send(e);
         });
    }

    getTotalForCurrentWeek(req, res) {
        var thursday = moment().startOf('week').add(4, 'days').toDate();
        console.log("thursday: " + thursday);
        var today = new Date();
        console.log("today:" + today);
        this.dailyCallLogService.getTotalCallersForDateRange(thursday, today).then( (data) => {
            res.status(200).send(data.toString());
        }).catch((e) => {
            res.status(500).send(e);
        });
    }

}

module.exports = DailyCallLogsController;
