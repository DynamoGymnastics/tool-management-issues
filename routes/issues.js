'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('issues', { menu: 'issues' });
});

router.get('/create', function(req, res, next) {

  // TODO: make call to API for issues
  // TODO: get array of labels
  // TODO: add labels to view model
  res.render('issues/create', { menu: 'issues' });
});

router.post('/create', function(req, res, next) {
  let issue = req.body;

  // TODO: sanitize all data
  // TODO: send request to API
  // TODO: wait for reply
  // TODO: display something nice for the user
  console.log(issue);
  res.redirect('/issues');
  // res.redirect('back');
});

module.exports = router;
