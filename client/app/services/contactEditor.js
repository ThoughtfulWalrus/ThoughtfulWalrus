angular.module('distress')

.factory('ContactEditor', function($http){
  var contactEditor = {};

  contactEditor.addContact = function(contact){
    return $http({
      method: 'POST',
      url: '/user/addContact',
      data: {contact: contact}
    });
  };

  contactEditor.updateContact = function(contact){
    return $http({
      method: 'POST',
      url: '/user/updateContact',
      data: {contact: contact}
    });
  };

  contactEditor.getContacts = function(contact){
    return $http({
      method: 'GET',
      url: '/user/getContacts'
    }).then(function (resp) {
      return resp.data;
    });;
  };
  return contactEditor;
});
