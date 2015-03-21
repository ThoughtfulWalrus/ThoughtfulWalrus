angular.module('distress')
.controller('ContactController', ['$scope', 'ContactEdit', function ($scope, ContactEdit) {

  $scope.contacts = [];

  // Will add a contact into the users emergency contacts. 
  // Then it syncs with the database. 
  $scope.addContact = function(){
    var person = {name: $scope.contact.name, phone: $scope.contact.phone};

    ContactEdit.addContact(person).then(function(response){
      if(response.status === 200){
        $scope.getContacts();
      }
    });
  };

  // This function will get all the emergency contacts for a user. 
  $scope.getContacts = function(){
    var contactsFromDB = ContactEdit.getContacts().then(function(result){
      $scope.contacts = result;
      $scope.contacts.forEach(function(contact){
        if(!contact.editing)
          contact.editing = false;
      });
    });
  };

  // This function will update a contact based on the id. 
  $scope.updateContact = function(){
    ContactEdit.updateContact(this.person).then(function(result){
      this.person.editing = false;
    }.bind(this));
  };

  // This will switch between the editing view and the contact view. 
  $scope.editContact = function(view){
    this.person.editing = true;
  }

  $scope.editCancel = function(view){
    this.person.editing = false;
  }

  $scope.getContacts();
}]);