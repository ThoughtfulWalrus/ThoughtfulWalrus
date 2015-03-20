var app = angular.module('distress', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
          url: '/',
          controller: 'HomeCtrl',
          templateUrl: 'app/home/home.html',
      })
      .state('signin', {
          url: '/signin',
          templateUrl: 'app/signin/signin.html',
          controller: 'SigninCtrl',
          authenticate: false,
          reload: false
      })
      .state('signup', {
          url: '/signup',
          templateUrl: 'app/signup/signup.html',
          controller: 'SignupCtrl',
          authenticate: false,
      })
      .state('contacts', {
          url: '/contacts',
          templateUrl: 'app/addContacts/addContacts.html',
          controller: 'ContactController',
          authenticate: false,
      })
      .state('police_map', {
        url: '/police-map',
        controller: 'PoliceCtrl',
        templateUrl: 'app/policeMap/police-map.html'
      })
      .state('hospital_map', {
        url: '/hospital-map',
        controller: 'HospitalCtrl',
        templateUrl: 'app/hospitalMap/hospital-map.html'
      });
})

console.log('app loaded successfully');

