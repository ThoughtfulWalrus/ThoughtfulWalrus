var express = require('express');
var sms = require('./modules/smsHandler');

var app = express();

app.post('/Messages', function(req, res){
    // Get the phoneNumber property of the request.
    // This will be a phone number to send the text to. 
    var phoneNumber = req.body.phoneNumber;

    // TODO: Handle the sending of a text message when a POST is made to /Messages.
    sms.sendMessage(phoneNumber);
});

console.log('ThoughtfulWalrus is listening on 5000');
app.listen(5000);