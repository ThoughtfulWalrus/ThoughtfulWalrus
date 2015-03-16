var app = angular.module('distress', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $routeProvider
    .when('/signup', {
      templateUrl: '/signup/signup.html',
      controller: 'SignupController',
      authenticate: false
    })
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl',
      authenticate: false
    })
    .otherwise({
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl',
      authenticate: false
    });
})



