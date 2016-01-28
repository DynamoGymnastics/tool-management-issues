'use strict';

const GitHubApi = require('github4');
const async = require('async');
const _ = require('lodash');

const USER = 'mikemimik';
const REPO = 'dynamo-issues';
const GITHUB = new GitHubApi({
  version: '3.0.0',
  debug: false,
  protocol: 'https',
  host: 'api.github.com',
  timeout: 5000,
  headers: {
    'User-Agent': 'tool-management-issues'
  }
});

GITHUB.authenticate({
  type: 'oauth',
  token: require('../config').token
});

class Config {

  static getIssues(callback) {
    GITHUB.issues.getForRepo({
      user: USER,
      repo: REPO,
      state: 'all' // TODO: change to 'open'
    }, (err, issues) => {
      if (err) {
        console.log('We got an error.');
        console.error(err);
        callback(err, null);
      } else {

        async.filter(
          issues,
          function removePullRequests(item, async_cb) {
            if (item.pull_request) {
              async_cb(false);
            } else {
              async_cb(true);
            }
          },
          function done(filteredIssues) {
            callback(null, filteredIssues);
          }
        );
      }
    });
  };

  static getLabels(callback) {
    GITHUB.issues.getLabels({
      user: USER,
      repo: REPO
    }, (err, labels) => {
      if (err) {
        console.log('We got an error.');
        console.error(err);
        callback(err, null);
      } else {
        callback(null, labels);
      }
    });
  };

  static createIssue(data, callback) {
    let labels = (function setLabels(input) {
      if (input) {
        switch(typeof input) {
          case 'string':
            return Array.of(input);
            break;
          case 'object':
            if (_.isArray(input)) {
              return input;
            } else {
              return new Array();
            }
            break;
          default:
            return new Array();
        }
      }
    })(data.labels);

    GITHUB.issues.create({
      user: USER,
      repo: REPO,
      title: data.title,
      body: data.body,
      labels: labels
    }, (err, res) => {
      if (err) {
        console.log('>>', 'ERROR:', 'createIssues', 'create-callback');
        console.error(err);
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  };
};

module.exports = Config;