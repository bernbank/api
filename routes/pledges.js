var express = require('express');
var router = express.Router();
var PledgeService = require('../services/pledge-service');

var url = 'mongodb://localhost:27017/berniebank';
var pledgeService = new PledgeService(url);

router.post('/', function(req, res){
  pledgeService.createPledge(req.body)
      .then((pledge) => res.json(pledge))
      .catch((e) => res.status(500).send(e));
});

router.get('/:id', function(req, res) {
  pledgeService.getPledge(req.params.id)
      .then((pledge) => res.json(pledge))
      .catch((e) => res.status(500).send(e));
});

router.delete('/:id', function(req, res) {
  pledgeService.deletePledge(req.params.id)
      .then(() => res.status(204).send())
      .catch((e) => res.status(500).send(e));
});

module.exports = router;
