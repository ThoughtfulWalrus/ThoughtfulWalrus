var twilio = require('twilio');

/// Function: sendMessage(recipientPhoneNumber)
/// recipientPhoneNumber: A 10-digit phone number to send a text message to (i.e. 1112223333)
/// Description: This function will take a phone number to send a text message to 
/// and use Twilio's node API to send a text message. 
/// return: Nothing
exports.sendMessage = function(recipientPhoneNumber) {
    // Twilio Credentials 
    var accountSid = 'secretPlaceholder'; 
    var authToken = 'secretPlaceholder'; 
    var accountPhoneNumber = 'secretPlaceholder';
    
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