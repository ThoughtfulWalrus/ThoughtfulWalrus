angular.module('distress')

.factory('ContactEdit', function($http){
  var contactEdit = {};

  contactEdit.addContact = function(username, contact){
    return $http({
      method: 'POST',
      url: '/user/addContact',
      data: {username: 'anon',
             contact: contact}
    });
  };

  return contactEdit;
});
