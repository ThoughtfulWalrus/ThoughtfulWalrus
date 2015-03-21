var express = require('express');
var db = require('./db/config.js');

var app = express();
var mongoose = require('mongoose');
var User = require('./db/models/user.js');

var port = process.env.PORT || 5000;

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

app.get('/', function(req, res) {
    res.render('index');
    res.end();
});

console.log('ThoughtfulWalrus is listening on ' + port);
app.listen(port);

