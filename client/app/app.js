var app = angular.module('distress', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
          url: '/',
          controller: 'HomeCtrl',
          templateUrl: 'app/home/home.html'
      })
      .state('signup', {
          url: '/signup',
          templateUrl: '/signup/signup.html',
          controller: 'SignupController',
          authenticate: false
      });
});


