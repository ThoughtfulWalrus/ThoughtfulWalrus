angular.module('distress')
.controller('SignupCtrl', ['$scope', '$window', 'Auth', function($scope, $window, Auth){
  $scope.user = {};
  $scope.signUp = function(){
    Auth.signUp($scope.user)
      .then(function (response) {
        $window.localStorage.setItem('distressAuth', response.data.token);
        //add location path change?
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}]);

