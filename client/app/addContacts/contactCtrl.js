(function(){

  angular
    .module('distress')
    .controller('ContactCtrl', ContactCtrl);

  ContactCtrl.$inject = ['$scope', 'ContactEditor'];

  function ContactCtrl($scope, ContactEditor){
    $scope.contacts = [];
    $scope.addContactForm = false;
    $scope.addContactBtn = true;

    $scope.showAddContactForm = function () {
      $scope.addContactForm = true;
      $scope.addContactBtn = false;
    }

    // Will add a contact into the users emergency contacts.
    // Then it syncs with the database.
    $scope.addContact = function(){
      var person = {name: $scope.contact.name, phone: $scope.contact.phone};

      ContactEditor.addContact(person).then(function(response){
        if(response.status === 200){
          $scope.getContacts();
          $scope.contact.name = '';
          $scope.contact.phone = '';
        }

      });
    };

    // This function will get all the emergency contacts for a user.
    $scope.getContacts = function(){
      var contactsFromDB = ContactEditor.getContacts().then(function(result){
        $scope.contacts = result;
        $scope.contacts.forEach(function(contact){
          if(!contact.editing)
            contact.editing = false;
        });
      });
    };

    // This function will update a contact based on the id.
    $scope.updateContact = function(person){
      ContactEditor.updateContact(person).then(function(result){
        person.cancelName = person.name;
        person.cancelPhone = person.phone;
        person.editing = false;
      });
    };

    // This will switch between the editing view and the contact view.
    $scope.editContact = function(person){
      person.editing = true;
      person.cancelName = person.name;
      person.cancelPhone = person.phone;
    }

    $scope.deleteContact = function(person){
      ContactEditor.deleteContact(person).then(function(result){
        person.editing = false;
        $scope.getContacts();      
      });
    }

    $scope.editCancel = function(person){
      person.name =  person.cancelName;
      person.phone =  person.cancelPhone;
      person.editing = false;
    }

    $scope.getContacts();
  }
})();
