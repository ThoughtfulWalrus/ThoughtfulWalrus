angular.module('distress')
.controller('SignupCtrl', ['$scope', '$window', 'Auth', '$location', function($scope, $window, Auth, $location){
  $scope.user = {};
  $scope.inputError = false;

  $scope.signUp = function(){
    Auth.signUp($scope.user)
      .then(function (response) {
        $window.localStorage.setItem('distressAuth', response.data.token);
        $location.path('/');
        $scope.inputError = false;
      })
      .catch(function (error) {
        $scope.inputError = true;
      });
  };
}]);

