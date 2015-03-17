var smsController = require('./smsController.js');

module.exports = function (app) {
  app.get('/text', smsController.sendMessages);
};
