var express = require('express');
var router = express.Router();
var PledgeService = require('../services/pledge-service');

var url = 'mongodb://localhost:27017/berniebank';
var pledgeService = new PledgeService(url);

router.post('/', function(req, res){
  pledgeService.createPledge(req.body)
      .then((pledge) => res.json(pledge));
});

router.get('/:id', function(req, res) {
  pledgeService.getPledge(req.params.id)
      .then((pledge) => res.json(pledge));
});

router.delete('/:id', function(req, res) {
  pledgeService.deletePledge(req.params.id)
      .then(() => res.status(204).send());
});

module.exports = router;
