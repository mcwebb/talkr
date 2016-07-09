var describe = require('mocha').describe;
var it = require('mocha').it;
var beforeEach = require('mocha').beforeEach;
var afterEach = require('mocha').afterEach;
var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");

chai.use(sinonChai);

var RegistrationController = require('../src/js/controllers/RegistrationController');
var UserService = require('../src/js/services/UserService');

describe('RegistrationController', function () {
  var controller;
  var stub_$state = {go: sinon.stub().returns(true)};

  beforeEach(function () {
    controller = new RegistrationController(
      new UserService,
      stub_$state
    );
  });

  afterEach(function () {
    stub_$state.go.reset();
  });

  describe('#submit()', function () {
    var testArgs = {
      good:       {cc: '91',   number: '123456789'},
      sanitzable: {cc: '+91',  number: '1234-56789+223'},
      bad:        {cc: '1111', number: '1234567890123456'},
      badNumber:  {cc: '91',   number: '12ab'},
      badCc:      {cc: 'aaa',  number: '12211'}
    };

    it('should return false when supplied invalid arguments', function () {
      var badResults = [];
      badResults.push(controller.submit(testArgs.bad));
      badResults.push(controller.submit(testArgs.badCc));
      // badResults.push(controller.submit(testArgs.badNumber));

      badResults.forEach(function (result) {
        return expect(result).to.not.be.ok;
      });
    });

    it('should accept arguments which need to be sanitized', function () {
      var result = controller.submit(testArgs.sanitzable);

      expect(result).to.be.ok;
    });

    it('should transition to "app.choice" when successful', function () {
      var result = controller.submit(testArgs.good);

      expect(result).to.be.ok;
      expect(stub_$state.go).to.have.been.calledWith('choice');
    });

  });
});