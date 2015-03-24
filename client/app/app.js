(function(){

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
        .state('emergencyContacts', {
            url: '/emergencyContacts',
            templateUrl: 'app/emergencyContacts/emergencyContacts.html',
            controller: 'ContactCtrl',
            authenticate: true,
        })
        .state('policeMap', {
          url: '/policeMap',
          controller: 'PoliceCtrl',
          templateUrl: 'app/policeMap/policeMap.html'
        })
        .state('hospitalMap', {
          url: '/hospitalMap',
          controller: 'HospitalCtrl',
          templateUrl: 'app/hospitalMap/hospitalMap.html'
        });

        $httpProvider.interceptors.push('AttachTokens');
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
})();
