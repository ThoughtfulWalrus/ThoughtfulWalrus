var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser');

module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var smsRouter = express.Router();
  var userRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/sms', smsRouter); // use sms router for all sms requests
  app.use('/user', userRouter); // use user router for all user requests

  // inject our routers into their respective route files
  require('../sms/smsRoutes.js')(smsRouter);
  require('../users/userRoutes.js')(userRouter);
};
