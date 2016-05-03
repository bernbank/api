'use strict';

var config = require('../config/config');
var async = require('async');

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


	/**
	 * (Soft) deletes en email from the mailinglist collection
	 **/
	deleteEmail(strEmail) {
		return new Promise((resolve, reject) => {
			var query = {email: strEmail};
			
			this.mailinglist.update(query, {"$set" : {active: false} }, (err, results) => {
				if (err != null) {
					reject(err);
				} else {
					resolve();
				}
			});			
		});
	}


	/**
	 * (Soft) deletes en email from the mailinglist collection
	 **/
	insertEmails(emails) {
		return new Promise((resolve, reject) => {
			var bulk = this.mailinglist.initializeUnorderedBulkOp();

			async.each(emails, (email, callback) => {
				email["active"] = true;
				bulk.insert(email);
				callback();
			}, 
			(err) => {

				bulk.execute((err, result) => {
					resolve();
				});
			
			});
			
		});
	}


}

module.exports = MailingService;
