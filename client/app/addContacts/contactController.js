angular.module('distress')
.controller('ContactController', ['$scope', 'ContactEdit', function ($scope, ContactEdit) {

  //holds contacts to display on the page
  $scope.contacts = [];

  //TODO: adds contact to database on form submission
  $scope.addContact = function(){
    var person = {name: $scope.contact.name, phone: $scope.contact.phone};

    ContactEdit.addContact(person).then(function(response){
      if(response.status === 200)
        $scope.contacts.push(person);
    });
  };

  $scope.getContacts = function(){
    var contactsFromDB = ContactEdit.getContacts().then(function(result){
      $scope.contacts = result;
    });

  };
  $scope.getContacts();
}]);