(function(){

  angular
    .module('distress')
    .factory('ContactEditor', ContactEditor);

  ContactEditor.$inject = ['$http'];

  function ContactEditor($http){

    var instance = {
      addContact: addContact,
      updateContact: updateContact,
      getContacts: getContacts,
      deleteContact: deleteContact
    };

    return instance;

    ////// IMPLEMENTATION ///////

    function addContact(contact){
      return $http({
        method: 'POST',
        url: '/user/addContact',
        data: {contact: contact}
      });
    }

    function updateContact(contact){
      return $http({
        method: 'POST',
        url: '/user/updateContact',
        data: {contact: contact}
      });
    }

    function deleteContact(contact){
      return $http({
        method: 'POST',
        url: '/user/deleteContact',
        data: {contact: contact}
      });
    }

    function getContacts(){
      return $http({
        method: 'GET',
        url: '/user/getContacts'
      }).then(function (resp) {
        return resp.data;
      });
    }
  }
})();

