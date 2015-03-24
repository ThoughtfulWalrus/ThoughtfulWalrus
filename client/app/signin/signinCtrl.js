(function(){

  angular
    .module('distress')
    .controller('SigninCtrl', SigninCtrl);

  SigninCtrl.$inject = ['$scope', '$window', 'Auth', '$location'];

  function SigninCtrl($scope, $window, Auth, $location){
    $scope.user = {};
    $scope.inputError = false;

    $scope.signIn = function(){
      Auth.signIn($scope.user)
        .then(function (response) {
          $window.localStorage.setItem('distressAuth', response.data.token);
          console.log('yayyy');
          $location.path('/');
        })
        .catch(function (error) {
          $scope.inputError = true;
        });
    };
  }
})();
