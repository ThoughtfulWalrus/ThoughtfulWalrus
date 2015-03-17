var app = angular.module('distress', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $routeProvider
    //note: instead of hardcoding the controller into the view, specifying the controller below will be enough!
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



