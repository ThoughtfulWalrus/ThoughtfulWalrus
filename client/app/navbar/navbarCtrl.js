angular.module('distress')
.controller('NavbarCtrl', ['$scope', 'Auth', function ($scope, Auth) {
  $scope.showContacts = function(){
    return Auth.isAuthenticated();
  }
}]);