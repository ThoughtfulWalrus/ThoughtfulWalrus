angular.module('distress')
.controller('SignupController', ['$scope', 'Auth', function($scope, Auth){
  $scope.signIn = function(){
    console.log($scope.user);
    Auth.signup($scope.user).then(function(response){

    });
  };
}]);