angular.module('distress')

.factory('ContactEdit', function($http){
  var contactEdit = {};

  contactEdit.addContact = function(contact){
    return $http({
      method: 'POST',
      url: '/user/addContact',
      data: {contact: contact}
    });
  };

  contactEdit.getContacts = function(contact){
    return $http({
      method: 'GET',
      url: '/user/getContacts'
    }).then(function (resp) {
      return resp.data;
    });;
  };
  return contactEdit;
});
