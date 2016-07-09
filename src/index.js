'use strict';
var app = require('angular').module('talkr', [
  require('angular-ui-router')
]);

app.config(require('./js/config'));
app.run(require('./js/run'));

app.service('UserService', require('./js/services/UserService'));

app.controller({
  'RegistrationController': require('./js/controllers/RegistrationController')
});

module.exports = app;
