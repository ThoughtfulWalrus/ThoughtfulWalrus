angular.module('distress')
.controller('SigninCtrl', ['$scope', '$window', 'Auth', function($scope, $window, Auth){
  $scope.user = {};
  $scope.signIn = function(){
    Auth.signIn($scope.user)
      .then(function (response) {
        $window.localStorage.setItem('distressAuth', response.data.token);
        console.log('yayyy');
        //add location path change?
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}]);