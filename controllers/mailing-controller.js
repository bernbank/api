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
     * (Soft) delets an email from the  mailinglist collection
     **/
    deleteEmail(req, res) {
        this.mailingService.deleteEmail(req.params.email)
            .then((email) => res.json(email))
            .catch((e) => res.status(500).send(e));
    }



}

module.exports = MailingController;
