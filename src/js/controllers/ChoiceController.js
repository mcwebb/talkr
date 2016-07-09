function ChoiceController($scope) {
  this.state = 'stopped';

  // TODO: refactor into RecognitionService
  var grammars = new webkitSpeechGrammarList();
  grammars.addFromString('#JSGF V1.0; grammar choices; public <choice> = search | message', 1);

  var recognition = new webkitSpeechRecognition();
  recognition.grammars = grammars;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 0;

  recognition.onaudiostart = function () {
    this.state = 'listening';
    $scope.$apply();
  }.bind(this);

  recognition.onspeechend = function() {
    recognition.stop();
    this.state = 'processing';
    $scope.$apply();
  }.bind(this);

  recognition.onresult = function(event) {
    console.log(event.results[0][0].transcript);
    console.log('Confidence: ' + event.results[0][0].confidence);

    this.state = 'stopped';
    this.selection = event.results[0][0].transcript;
    $scope.$apply();
  }.bind(this);

  recognition.onerror = recognition.onnomatch = function (event) {
    this.state = 'error';
    $scope.$apply();
  }.bind(this);

  recognition.start();
}

module.exports = ChoiceController;