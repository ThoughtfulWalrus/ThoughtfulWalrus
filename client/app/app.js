var app = angular.module('distress', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $routeProvider
    .when('/signup', {
      templateUrl: '/signup/signup.html',
      controller: 'SignupController',
      authenticate: false
    })
    .when('/', {
      templateUrl: 'home/home.html',
      controller: 'HomeController',
      authenticate: false
    })
    .otherwise({
      templateUrl: 'home/home.html',
      controller: 'HomeController',
      authenticate: false
    });
})

