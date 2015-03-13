var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser');

module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var smsRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client/app'));


  app.use('/sms', smsRouter); // use user router for all user request

  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  // inject our routers into their respective route files
  require('../sms/smsRoutes.js')(smsRouter);
};
