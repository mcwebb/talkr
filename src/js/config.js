function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('registration', {
      url: '/',
      templateUrl: 'templates/registration.html',
      controller: 'RegistrationController',
      controllerAs: 'Registration'
    })
  ;
}

module.exports = config;
