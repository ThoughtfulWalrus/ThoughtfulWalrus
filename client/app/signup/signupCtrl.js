(function(){

  angular
    .module('distress')
    .controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject =  ['$scope', '$window', 'Auth', '$location'];

  function SignupCtrl($scope, $window, Auth, $location){
    $scope.user = {};
    $scope.inputError = false;

    $scope.signUp = function(){
      Auth.signUp($scope.user)
        .then(function (response) {
          $window.localStorage.setItem('distressAuth', response.data.token);
          $location.path('/');
        })
        .catch(function (error) {
          $scope.inputError = true;
        });
    };
  }
})();