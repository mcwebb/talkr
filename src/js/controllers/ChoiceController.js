function ChoiceController($scope) {
  this.isListening = false;
  this.isError = false;
  this.state = 0;

  $scope.$watch(
    function () {
      if (this.isListening) return 'listening';
      else if (this.isError) return 'error';
      else return 'disabled';
    }.bind(this),
    function (state) {
      this.state = state;
    }.bind(this)
  );

  var grammars = new webkitSpeechGrammarList();
  grammars.addFromString('#JSGF V1.0; grammar choices; public <choice> = search | message', 1);

  var recognition = new webkitSpeechRecognition();
  recognition.grammars = grammars;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 0;

  recognition.onaudiostart = function () {
    this.isListening = true;
    $scope.$apply();
  }.bind(this);

  recognition.onspeechend = function() {
    recognition.stop();
    this.isListening = false;
    $scope.$apply();
  }.bind(this);

  recognition.onresult = function(event) {
    console.log(event.results[0][0].transcript);
    console.log('Confidence: ' + event.results[0][0].confidence);

    this.isListening = false;
    this.selection = event.results[0][0].transcript;
    $scope.$apply();
  }.bind(this);

  recognition.onerror = recognition.onnomatch = function (event) {
    this.isListening = false;
    this.isError = true;
    $scope.$apply();
  }.bind(this);

  recognition.start();
}

module.exports = ChoiceController;