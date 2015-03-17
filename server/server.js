var express = require('express');
var db = require('./db/config.js');
var app = express();
var mongoose = require('mongoose');
var user = require('./db/models/user.js');

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

module.exports = app;

console.log('ThoughtfulWalrus is listening on 5000');
app.listen(5000);