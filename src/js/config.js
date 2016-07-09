function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('registration', {
      url: '/',
      templateUrl: 'templates/registration.html',
      controller: 'RegistrationController',
      controllerAs: 'Registration'
    })
    .state('choice', {
      url: '/choice',
      templateUrl: 'templates/choice.html',
      controller: 'ChoiceController',
      controllerAs: 'Choice'
    })
  ;
}

module.exports = config;
