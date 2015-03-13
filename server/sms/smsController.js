var creds = require('./../config/creds.js');
var twilio = require('twilio')(creds.accountSid, creds.authToken);

/// Function: sendMessage(req, res)
/// req: The request being sent. We want to phone number coming in to be a 10-digit number (i.e 1112223333)
/// res: The response to send back
/// Description: This function will take a phone number to send a text message to 
/// and use Twilio's node API to send a text message. 
/// return: Nothing
exports.sendMessage = function(req, res) {
    // Get the phoneNumber property of the request.
    // This will be a phone number to send the text to. 
    var recipientPhoneNumber = '9256832288';

    // Twilio Credentials 
    var accountPhoneNumber = creds.accountPhoneNumber;
     
    twilio.messages.create({ 
        to: "+1" + recipientPhoneNumber, 
        from: accountPhoneNumber, 
        body: "Hello World",   
    }, function(err, message) { 
        console.log(message.sid); 
    });
}