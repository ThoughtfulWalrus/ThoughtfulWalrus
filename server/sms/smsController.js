var creds = require('./../config/creds.js');
var twilio = require('twilio')(creds.accountSid, creds.authToken);

/// Function: sendMessage(req, res)
/// req: The request being sent. We want to phone number coming in to be a 10-digit number (i.e 1112223333)
/// res: The response to send back
/// Description: This function will take a phone number to send a text message to 
/// and use Twilio's node API to send a text message. It will send back a 200 code 
/// if the SMS was successful. Otherwise, it will send a string containing the twilio error code 
/// and message. 
/// return: An array of responses from twilio API, each containing {status, message}
exports.sendMessages = function(req, res) {
    // Get the phoneNumber property of the request.
    // This will be a phone number to send the text to. 
    var contactList = ['111111','9256832288','2222222','9256832288','9256832288','2222222','2222222','9256832288','2222222','2222222','2222222','2222222','2222222','2222222','2222222','2222222','2222222','2222222']; //req.body.contactList;
    var twilioReponses = [];

    // This is a counter to tell us when we have hit the last contact to text
    // SUPER hacky, but other than forcing the user to send multiple POST requests,
    // and callback hell, this is how we are doing this. 
    var counter = 0;

    // For every contact in our list, text them
    for(var i = 0; i < contactList.length;i++){
        var contact = contactList[i];

        var twilioResponse = {
            status: 'UNKNOWN',
            message: 'UNKNOWN'
        };

        var promise = sendMessage(contact);

        // Ok so, this shit is crazy. So let me break it down:
        // 1. The promise is asynchronous, so we have no idea when it will be fufilled.
        // 2. We need to preserve the order, aka if I text [mom, dad], I had better not get [dad, mom]
        // 3. Each text finishes at a different time, there is no guarantee of order
        //      - An example is, successful texts take significantly longer than failures
        // 4. This 'for' loop will execute almost immediately, so index will hit max and if we
        // try to use the index in the 'then' clause, it might be the max
        // SOLUTION: IIFE's
        // We have 2 IIFE's here, one in the function addMessageToResponse, and another as
        // the final function to execute when the promise has been fufilled. 
        // We need to preserve the index so using an IIFE allows us to bind the current value
        // of index to addMessageToResponse. What happens when we move onto the next iteration 
        // of the loop? addMessageToResponse gets overwritten! Well that sucks. 
        // This is where IIFE #2 comes in, we bind to the 'fin' function this instance of addMessageToResponse
        // And so when it is eventually called, it has bound to it the correct function. 
        var addMessageToResponse = (function(idx){
            return function(status, message){
                twilioReponses[idx] = {status: status, message: message};
                if(counter === contactList.length - 1){
                    res.send(twilioReponses);
                }
                counter++;
            }
        })(i);

        promise.then(function(message) {
            twilioResponse.status = 'SUCCESS';
            twilioResponse.message = message.sid;

        },function(error) {
            twilioResponse.status = 'FAIL';
            twilioResponse.message = error.message;
        }).fin((function(callback){
            return function(){
              callback(twilioResponse.status, twilioResponse.message);
            }
        })(addMessageToResponse));
    };
};

/// Function: sendMessage(recipientPhoneNumber)
/// recipientPhoneNumber: The phone number to send a text message to
/// This function will begin to send a text message to a contact. It returns
/// a promise that can be used. 
/// returns: A promise for the asynchronous call to twilio API.
var sendMessage = function(recipientPhoneNumber){
    // Twilio Credentials 
    var accountPhoneNumber = creds.accountPhoneNumber;

    // Send the text message
    var promise = twilio.messages.create({ 
        to: "+1" + recipientPhoneNumber, 
        from: accountPhoneNumber, 
        body: "Hello World",   
    });
    return promise;
}