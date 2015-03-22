var creds = require('./../config/creds.js');
var twilio = require('twilio')(creds.accountSid, creds.authToken);
var User = require('../db/models/user');
var jwt = require('jwt-simple');
var authToken = require('../config/creds').distressAuthToken;

/// Function: sendMessage(req, res)
/// req: The request being sent. All that is needed in the request is the username
/// res: The response to send back. 
/// Description: This function will take a username and use Twilio's node API 
/// to send a text message to every number in the users emergency contact list.
/// It will send back a 200 code if the SMS was successful.
/// return: An array of responses from twilio API, each containing {status, message}
module.exports.sendMessages = function(req, res) {
    var token = req.headers['x-access-token'];

    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, authToken);

      // Find the user in the database and determine if they are authorized
      User.findOne({ username: user.username })
        .exec(function(err,user) {
          if (!user) {
            res.status(401).send('Not Authorized');
          } 
          else {
            var twilioReponses = [];

            // If there are no contacts to send to, send back a 200 response with an empty array.
            if(user.emergencyContacts.length === 0){
                res.status(200).send(twilioReponses);
            }

            // This is a counter to tell us when we have sent the last text
            var counter = 0;

            // For every contact in our list, text them
            for(var i = 0; i < user.emergencyContacts.length;i++){
                var contactNumber = user.emergencyContacts[i].phone;

                var twilioResponse = {
                    status: 'UNKNOWN',
                    message: 'UNKNOWN'
                };

                var promise = sendMessage(contactNumber);

                // Ok so, this shit is crazy. So let me break it down:
                // 1. The promise is asynchronous.
                // 2. We need to preserve the order the texts were sent in our response
                //    - (i.e.) If I text [mom, dad], I had better not get [dad, mom]
                // 3. Each text finishes at a different time.
                //    - Successful texts take 10x longer than failures to return
                // 4. The 'for' loop's iteration will increase before a promise is fufilled.
                //    - Basically, 'i' could be 10 when the first promise is fufilled. 
                // SOLUTION: 2 IIFE's
                // 1. To bind the current index in the loop for later use
                // 2. To bind the function to call in the 'finally (fin)' clause of our promise
                // We need to preserve the index so using an IIFE allows us to bind the current value
                // of index to addMessageToResponse. What happens when we move onto the next iteration 
                // of the loop? addMessageToResponse gets overwritten! Well that sucks. 
                // This is where IIFE #2 comes in. We bind to the 'fin' clause this instance of addMessageToResponse.
                // You are probably wondering, but doesn't fin run only at the end of a promise and thus the function
                // we have bound should be overwritten? The IIFE #2 executes immediately, so 'fin'
                // sees a function that it will call later, but bound to that function is the correct
                // addMessageToResponse. And so when it is eventually called, it has the correct function bound to it. 
                var addMessageToResponse = (function(idx){
                    return function(twilioResponse){
                        var currentdate = new Date(); 
                        var status = twilioResponse.status + " - " + (currentdate.getMonth()+1) + "/"
                                        + currentdate.getDate() + "/" 
                                        + currentdate.getFullYear() + " @ "  
                                        + currentdate.getHours() + ":"  
                                        + currentdate.getMinutes() + ":" 
                                        + currentdate.getSeconds();

                        user.emergencyContacts[idx].lastMsgStatus = status;
                        twilioReponses[idx] = { status: twilioResponse.status,
                                                message: twilioResponse.message};
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
                      callback(twilioResponse);

                      if(counter === user.emergencyContacts.length - 1){
                        user.save(function(err,user){
                            if(err){
                                res.status(400).send('Error saving last message statuses')
                            } else {
                                res.status(200).send(twilioReponses);
                            }
                        });
                      }
                      counter++;
                    }

                })(addMessageToResponse));
            };
          }
      });
    }
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