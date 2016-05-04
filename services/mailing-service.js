'use strict';

var config = require('../config/config');
var async = require('async');
var ses = require('node-ses');
var pug = require('pug');

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


    /**
     * Sends a single email to a single user
     **/
    sendSingleEmail(clientSES, data) {
        var strTemplateHTML = pug.renderFile('./views/email-html.pug', data );
        var strTemplateTEXT = pug.renderFile('./views/email-text.pug', data );
        var objEmail =  {
            to: data.email,
            from: 'berniesanders@gmail.com',
            subject: 'Support bernie!!',
            message: strTemplateHTML,
            altText: strTemplateTEXT
        };
        console.log(objEmail);
        /*
           clientSES.sendEmail(data, (err, data, res) => {
           console.log("EMAIL SENT!!!"); 
        });
        */ 
    }

    /**
    * Sends emails tall users in the mailinglist collection
    **/
    sendEmails(strDryRunEmail) {
        return new Promise( (resolve, reject) => {
            var client = ses.createClient(config.amazonSES);

            if (strDryRunEmail == "") {
                // Find all available emails and send emails to those guys :)
                var query = {active:true};
                this.mailinglist.find(query, (err, thing) => {                
                    if (err != null) {
                         // There was an error, let's report it
                        reject(e);
                    }
                    thing.each( (err,doc) => {
                        if (err != null) {
                             // There was an error, let's report it
                            reject(err);
                        }
                        if (doc != null) {
                            this.sendSingleEmail(client,  doc);
                        } else {
                            resolve();
                        }
                    });        
                });
            } else {
                this.sendSingleEmail(client,  {
                    firstname: 'Dry',
                    lastname : 'Runner',
                    email: strDryRunEmail
                });
                resolve();
            }


        });

    }

}

module.exports = MailingService;
