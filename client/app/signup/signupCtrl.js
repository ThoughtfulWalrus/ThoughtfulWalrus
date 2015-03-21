angular.module('distress')
.controller('SignupCtrl', ['$scope', '$window', 'Auth', '$location', function($scope, $window, Auth, $location){
  $scope.user = {};
  $scope.signUp = function(){
    Auth.signUp($scope.user)
      .then(function (response) {
        $window.localStorage.setItem('distressAuth', response.data.token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}]);

