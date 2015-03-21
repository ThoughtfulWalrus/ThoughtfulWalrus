angular.module('distress')
.controller('SigninCtrl', ['$scope', '$window', 'Auth', '$location', function($scope, $window, Auth, $location){
  $scope.user = {};
  $scope.signIn = function(){
    Auth.signIn($scope.user)
      .then(function (response) {
        $window.localStorage.setItem('distressAuth', response.data.token);
        console.log('yayyy');
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}]);