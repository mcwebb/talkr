'use strict';

var angular = require('angular');
var config = require('./js/config.js');
var run = require('./js/run.js');

var app = angular.module('talkr', []);

app.config(config);
app.run(run);
