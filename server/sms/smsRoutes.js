var smsController = require('./smsController.js');

module.exports = function (app) {
  app.post('/text', smsController.sendMessages);
};
