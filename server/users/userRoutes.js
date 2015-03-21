var userController = require('./userController.js');

module.exports = function (app) {
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.post('/addContact', userController.addContact);
  app.post('/updateContact', userController.updateContact);
  app.get('/getContacts', userController.getContacts);
};
