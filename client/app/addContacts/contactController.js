angular.module('distress')
.controller('ContactController', ['$scope', 'ContactEdit', function ($scope, ContactEdit) {

  $scope.contacts = [];

  $scope.addContact = function(){
    var person = {name: $scope.contact.name, phone: $scope.contact.phone};

    ContactEdit.addContact(person).then(function(response){
      if(response.status === 200){
        $scope.getContacts();
      }
    });
  };

  $scope.getContacts = function(){
    var contactsFromDB = ContactEdit.getContacts().then(function(result){
      $scope.contacts = result;
      $scope.contacts.forEach(function(contact){
        if(!contact.editing)
          contact.editing = false;
      });
    });
  };

  $scope.updateContact = function(){
    console.log(this.person._id);
    ContactEdit.updateContact(this.person).then(function(result){
      this.person.editing = false;
    }.bind(this));
  };

  $scope.editContact = function(view){
    console.log('editing')
    this.person.editing = true;
  }

  $scope.getContacts();
}]);