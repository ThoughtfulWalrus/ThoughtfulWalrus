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
  
  // Collapse the mobile navbar on click
  $('.nav a').on('click', function(){      
      $(".navbar-toggle").click(); 
  });  

})();