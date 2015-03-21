angular.module('distress')
.controller('ContactController', ['$scope', '$rootScope', 'ContactEdit', function ($scope, $rootScope, ContactEdit) {

  //holds contacts to display on the page
  $scope.contacts = [];

  //TODO: adds contact to database on form submission
  $scope.addContact = function(){
    var person = {name: $scope.contact.name, phone: $scope.contact.phone};

    ContactEdit.addContact($scope.username, person).then(function(response){
      if(response.status === 200)
        $scope.contacts.push(person);
    });
  };

  $scope.getContacts = function(){
    //retrieves contacts from the database
    //based on user
  };
}]);