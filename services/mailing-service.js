'use strict';

var config = require('../config/config');


class MailingService {

    constructor(db) {
        this.mailinglist = db.collection('mailinglist');
    }

	/**
	 * Gets a list of all active emails
	 **/
	getActiveEmails() {
		return new Promise((resolve, reject) => {
			var query = {active:true};
			this.mailinglist.find(query, { email: true }, (err, thing) => {				
				if (err != null) {
					 // There was an error, let's report it
					reject(e);
				}
				
				var output = [];
				thing.each( (err,doc) => {
					
					if (err != null) {
						 // There was an error, let's report it
						reject(err);
					}

					if (doc != null) {
						output.push(doc);
					} else {
						resolve(output);
					}
				});
						
			});
			
		});
		
	}

}

module.exports = MailingService;
