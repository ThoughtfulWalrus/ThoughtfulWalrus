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
          authenticate: true,
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
      
      $httpProvider.interceptors.push('AttachTokens');
})
.controller('NavigationBarController', function ($scope, Auth) {
  $scope.showContacts = function(){
    return Auth.isAuthenticated();
  }
})
.run(function ($rootScope, $state, $stateParams, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams){
    if (toState && toState.authenticate && !Auth.isAuthenticated()) {
      $state.go('home');
      event.preventDefault(); 
    }
  });
});
console.log('app loaded successfully');

