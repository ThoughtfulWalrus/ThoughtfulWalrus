var userController = require('./userController.js');

module.exports = function (app) {
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.post('/addContact', userController.addContact);
  app.post('/updateContact', userController.updateContact);
  app.post('/deleteContact', userController.deleteContact);
  app.get('/getContacts', userController.getContacts);
};
