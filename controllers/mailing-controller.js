'use strict';

class MailingController {

    constructor(mailingService) {
        this.mailingService = mailingService;
    }

    /**
     * Gets all the active emails from the database
     **/
    getActiveEmails(req, res) {
        this.mailingService.getActiveEmails()
            .then((emails) => res.json(emails))
            .catch((e) => res.status(500).send(e));
        
    }

    /**
     * (Soft) deletes an email from the  mailinglist collection
     **/
    deleteEmail(req, res) {
        this.mailingService.deleteEmail(req.params.email)
            .then((email) => res.json(email))
            .catch((e) => res.status(500).send(e));
    }


    /**
     * (Soft) deletes an email from the  mailinglist collection
     **/
    unsubscribeEmail(req, res) {
        this.mailingService.deleteEmail(req.params.email)
            .then((email) => {
                res.redirect(301, 'http://bernbank.com/');
            })
            .catch((e) => res.status(500).send(e));
    }

    /**
     * Bulk insert of emails in the mailinglist tollection
     **/
    insertEmails(req, res) {
        this.mailingService.insertEmails(req.body)
            .then(() => {
                res.status(200).send();
            }).catch((e) => {
                res.status(500).send(e);
            });
    }

    /**
     * Sends emails to all the active emails in the mailinglist collection.
     **/
    sendEmails(req, res) {
        var strDryRunEmail = "";
        if (req.query['dryrun'] != undefined) {
            strDryRunEmail = req.query['dryrun'];
        }
        this.mailingService.sendEmails(strDryRunEmail)
            .then(() => {
                res.status(200).send();
            }).catch((e) => {
                res.status(500).send(e);
            });
    }


}

module.exports = MailingController;
