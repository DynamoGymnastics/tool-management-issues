'use strict';
const express = require('express');
const Config = require('../libs/Config');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  // TODO: check session for error
  Config.getIssues((err, issues) => {
    let model = {
      menu: null,
      issues: null,
      require: require
    };
    model.menu = 'issues';
    if (err) {
      model.issues = [{}];
      console.log('err:', err);
    } else {
      model.issues = issues;
    }
    res.render('issues', model);
  });
  // res.render('issues', { menu: 'issues' });
});

router.get('/create', function(req, res, next) {
  let model = {
    menu: null,
    labels: null
  };
  model.menu = 'issues';
  Config.getLabels((err, labels) =>{
    if (err) {
      model.labels = [];
    } else {
      model.labels = labels;
    }
    res.render('issues/create', model);
  });
});

router.post('/create', function(req, res, next) {
  let issue = req.body;
  console.log(issue);

  // TODO: sanitize all data
  Config.createIssue(issue, (err, data) => {
    if (err) {

      // TODO: tell the user we got an error
      console.log('tell you user we got an error.');
      req.params.error = 'CreateError';
    } else {

      // TODO: display something nice for the user
      res.redirect('/issues');
    }
  });
});

module.exports = router;
