'use strict';

var precond = require('precond');

class PledgesController {

    constructor(pledgeService) {
        this.pledgeService = pledgeService;
    }

    createPledge(req, res) {
        this.pledgeService.createPledge(req.body)
            .then((pledge) => res.json(pledge))
            .catch((e) => {
                if (e instanceof precond.IllegalArgumentError) {
                    res.status(400).send(e);
                } else {
                    res.status(500).send(e);
                }
            });
    }

    getPledge(req, res) {
        this.pledgeService.getPledge(req.params.id)
            .then((pledge) => {
                if (pledge) {
                    res.json(pledge);
                } else {
                    res.status(404).send("Pledge not found");
                }
            })
            .catch((e) => res.status(500).send(e));
    }

    deletePledge(req, res) {
        this.pledgeService.deletePledge(req.params.id)
            .then(() => res.status(204).send())
            .catch((e) => res.status(500).send(e));
    }

    /**
     * Returns yesterday's pledges
     **/
    getPledgesByDay(req, res) {
      var strDate = req.query['date'];
      this.pledgeService.getPledgesByDay(strDate)
        .then( (pledges) =>  {
          if (pledges) {
            res.json(pledges);
          } else {
            res.json({total: 0});
          }
        })
        .catch((e) => {
           res.status(500).send(e);
         });
    }

    /**
     * Gets the total amount of pledges in the database
     **/
    getTotalPledges(req, res) {
      this.pledgeService.getTotalPledges()
        .then( (pledges) =>  {
          if (pledges) {
            res.json(pledges);
          } else {
            res.json({total: 0});
          }
        })
        .catch((e) => {
           res.status(500).send(e);
         });
    }

    /**
     * Gets the historical number pledges per day in the database
     **/
    getHistoricPledges(req, res) {
      this.pledgeService.getHistoricPledges()
        .then( (pledges) =>  {
          if (pledges) {
            res.json(pledges);
          } else {
            res.json([]);
          }
        })
        .catch((e) => {
          res.status(500).send(e);
        });
    }

    /**
     * (Soft) deletes an email from the  mailinglist collection
     **/
    unsubscribeFromEmails(req, res) {
        this.pledgeService.unsubscribeFromEmails(req.params.email)
            .then(() => {
                res.redirect(301, 'http://bernbank.com/');
            })
            .catch((e) => res.status(500).send(e));
    }

}

module.exports = PledgesController;
