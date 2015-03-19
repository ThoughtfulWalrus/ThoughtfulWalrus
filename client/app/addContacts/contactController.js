angular.module('distress')
.controller('ContactController', function($scope){

  //TODO: adds contact to database on form submission
  $scope.addContact = function(){
    var person = {name: $scope.contact.name, phone: $scope.contact.phone};
    $scope.contacts.push(person);
  };

  //holds contacts to display on the page
  $scope.contacts = [];

  $scope.getContacts = function(){
    //retrieves contacts from the database
    //based on user
  };
});