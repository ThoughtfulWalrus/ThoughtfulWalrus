var express = require('express');

var app = express();

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

module.exports = app;

console.log('ThoughtfulWalrus is listening on 5000');
app.listen(5000);