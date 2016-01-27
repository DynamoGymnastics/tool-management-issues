'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('issues', { menu: 'issues' });
});

router.get('/create', function(req, res, next) {
  res.render('issues/create', { menu: 'issues' });
});

router.post('/create', function(req, res, next) {
  let issue = req.body;
  console.log(issue);
  res.render('issues', { menu: 'issues' });
});

module.exports = router;
