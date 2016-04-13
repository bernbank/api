'use strict';

class PledgesController {

    constructor(pledgeService) {
        this.pledgeService = pledgeService;
    }

    createPledge(req, res) {
        this.pledgeService.createPledge(req.body)
            .then((pledge) => res.json(pledge))
            .catch((e) => res.status(500).send(e));
    }

    getPledge(req, res) {
        this.pledgeService.getPledge(req.params.id)
            .then((pledge) => res.json(pledge))
            .catch((e) => res.status(500).send(e));
    }

    deletePledge(req, res) {
        this.pledgeService.deletePledge(req.params.id)
            .then(() => res.status(204).send())
            .catch((e) => res.status(500).send(e));
    }
}

module.exports = PledgesController;