(function(){

  angular
    .module('distress')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['$scope', 'Auth'];

  function NavbarCtrl($scope, Auth){

    $scope.showContactsAndLogout = function(){
      return Auth.isAuthenticated();
    };
    $scope.hideSignInAndOut = function(){
      return !Auth.isAuthenticated();
    };
    $scope.logoutUser = function(){
      return Auth.logout();
    };
  }
  
  // Collapse the mobile navbar on click
  $('.nav a').on('click', function(){      
      $(".navbar-toggle").click(); 
  });  

})();