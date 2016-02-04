'use strict';
const express = require('express');
const Config = require('../libs/Config');
const router = express.Router();
const async = require('async');
const markdown = require('github-flavored-markdown');
// const markdown = require('markdown-it')({ breaks: true });

// INFO: GET list of issues
router.get('/', function(req, res, next) {

  // TODO: check session for error
  Config.getIssues((err, issues) => {
    let model = {
      menu: null,
      issues: null,
      markdown: markdown
    };
    model.menu = 'issues';
    if (err) {
      console.log('ERROR:', err);
      // TODO: build an {issues} object to attach to model
      res.render('issues', model);
    } else {
      model.issues = issues;
      async.each(model.issues, (issue, each_cb) => {
          if (issue.labels.length === 0) {

            // INFO: there are no labels to display
            // INFO: push an empty object into array
            issue.labels.push({});
          }
          each_cb(null);
        }, (err) => {
          res.render('issues', model);
        }
      );
    }
  });
});

// INFO: GET form create page
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

// INFO: POST create issue
router.post('/create', function(req, res, next) {
  let issue = req.body;
  console.log(issue);

  // TODO: sanitize all data
  Config.createIssue(issue, (err, data) => {
    if (err) {

      // TODO: tell the user we got an error
      console.log('Tell the user we got an error.');
      res.redirect('/issues');
    } else {

      // TODO: display something nice for the user
      res.redirect('/issues');
    }
  });
});

module.exports = router;
