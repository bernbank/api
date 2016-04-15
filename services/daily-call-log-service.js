'use strict';

class DailyCallLogService {
    constructor(db) {
        this.dailyCallLogs = db.collection('dailyCallLog');
    }

    saveDailyCallLog(dailyCallLog) {
        return new Promise((resolve, reject) => {
            this.dailyCallLogs.updateOne(dailyCallLog, {upsert: true}).then(() => {
                resolve();
            }).catch(reject);
        });
    }
}

module.exports = DailyCallLogService;