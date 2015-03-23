(function(){

  angular
    .module('distress')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['$scope', 'Auth'];

  function NavbarCtrl($scope, Auth){
    $scope.showContacts = function(){
      return Auth.isAuthenticated();
    };
  }
})();