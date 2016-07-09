'use strict';
var app = require('angular').module('talkr', [
  require('angular-ui-router')
]);

app.config(require('./js/config.js'));
app.run(require('./js/run.js'));

var app = angular.module('talkr', []);

app.config(config);
app.run(run);
