var express = require('express');
var twilio = require('twilio');

var app = express();


app.post('/Messages', function(req, res){
    // Twilio Credentials 
    var accountSid = ''; 
    var authToken = ''; 
     
    //require the Twilio module and create a REST client 
    var client = require('twilio')(accountSid, authToken); 
     
    client.messages.create({ 
        to: "+", 
        from: "+", 
        body: "Hello World",   
    }, function(err, message) { 
        console.log(message.sid); 
    });
});

console.log('ThoughtfulWalrus is listening on 5000');
app.listen(5000);