var smsController = require('./smsController.js');

module.exports = function (app) {
  app.get('/text', smsController.sendMessage);
  app.get('/', function(req, res) {
      res.render('index');
      res.end();
  });
};
