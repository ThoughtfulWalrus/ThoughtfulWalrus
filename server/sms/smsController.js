var twilio = require('twilio');

/// Function: sendMessage(recipientPhoneNumber)
/// recipientPhoneNumber: A 10-digit phone number to send a text message to (i.e. 1112223333)
/// Description: This function will take a phone number to send a text message to 
/// and use Twilio's node API to send a text message. 
/// return: Nothing
exports.sendMessage = function(req, res) {
    // Get the phoneNumber property of the request.
    // This will be a phone number to send the text to. 
    var recipientPhoneNumber = 'secret';

    // Twilio Credentials 
    var accountSid = 'secret'; 
    var authToken = 'secret'; 
    var accountPhoneNumber = 'secret';
    
    //require the Twilio module and create a REST client 
    var client = require('twilio')(accountSid, authToken); 
     
    client.messages.create({ 
        to: "+1" + recipientPhoneNumber, 
        from: accountPhoneNumber, 
        body: "Hello World",   
    }, function(err, message) { 
        console.error(message.sid); 
    });
}