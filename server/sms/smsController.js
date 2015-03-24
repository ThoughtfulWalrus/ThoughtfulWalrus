var jwtAuthToken = process.env.DISTRESS_AUTH_TOKEN || require('../config/creds').distressAuthToken;
var twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || require('../config/creds').accountSid;
var twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || require('../config/creds').authToken;
var twilio = require('twilio')(twilioAccountSid, twilioAuthToken);
var User = require('../db/models/user');
var jwt = require('jwt-simple');

/// Description: This function will take a username and use Twilio's node API
/// to send a text message to every number in the users emergency contact list.
/// It will send back a 200 code if the SMS was successful.
module.exports.sendMessages = function(req, res) {
  var location = {
        latitude: req.body.latitude,
        longitude: req.body.longitude
      },
      timeOfDistress = req.body.timeOfDistress,
      googleMapsLink = req.body.mapLink,
      findUser = Q.nbind(User.findOne, User),
      counter = {count: 0},
      token = req.headers['x-access-token'];

  if (!token) {
    next(new Error('No token'));
  } else {
    var user = jwt.decode(token, jwtAuthToken);

    findUser({ username: user.username })
      .then(function(user, err) {
        if (!user) {
          res.status(401).send('Not Authorized');
        } else {
          // If there are no contacts to send to, send back a 200 response with an empty array.
          if(user.emergencyContacts.length === 0){
            res.status(200).send();
            return;
          }else{
            var messagesOptions = {
              user: user,
              location: location,
              googleMapsLink: googleMapsLink,
              timeOfDistress: timeOfDistress,
              res: res,
              counter: counter
            };

            initiateMessages(messagesOptions);
        }
      }
    });
  }
};



/////////////////////////////////////////////////
/////////////// Helper Functions ////////////////
/////////////////////////////////////////////////

/// this initiates the sending of all of the messages
var initiateMessages = function(params){

  if(params.user.emergencyContacts.length === 0){
    params.res.status(200).send();
    return;
  }else{
    params.user.emergencyContacts.forEach(function(contact, i){
      //creates promise which will be handled by the
      // handleTwilioResponse function
      var promise = sendMessage(params.location.latitude,
                                params.location.longitude,
                                params.googleMapsLink,
                                contact.phone);

      var options = {
            twilioResponse: {},
            user: params.user,
            counter: params.counter,
            responseCallback: createTwilioResponseCallback(i, params.user, params.timeOfDistress),
            res: params.res
          };

      // handles twilio promise
      handleTwilioResponse(promise, options);
    });
  }
};

/// This function will begin to send a text message to a contact.
/// It returns a promise for the asynchronous call to twilio API.
var sendMessage = function(latitude, longitude, googleMapsLink, recipientPhoneNumber){
  // Twilio Credentials
  var accountPhoneNumber = creds.accountPhoneNumber,
      message = "Distress from username!" +
                '\n' + "Latitude: " + latitude +
                '\n' + "Longitude: " + longitude +
                '\n' + "Google Maps: " + googleMapsLink;

  // Send the text message
  var promise = twilio.messages.create({
      to: "+1" + recipientPhoneNumber,
      from: accountPhoneNumber,
      body: message,
  });

  return promise;
};

//  creates twilio response callback. want to bind 'i' so
//  asynchronous responses correspond with the emergency contact
var createTwilioResponseCallback = function(i, user, timeOfDistress){
  return (function(idx){
            return function(twilioResponse){
              user.emergencyContacts[idx].lastMsgStatus = twilioResponse.status + ' - ' + timeOfDistress + '. ';
              if(twilioResponse.status === 'FAIL'){
                user.emergencyContacts[idx].lastMsgStatus += twilioResponse.message;
              }
            };
          })(i);
};

// accepts an object full of parameters
// handles twilio response, saves results to database
// binding the fin callback to the correct response callback
// because 'i' will be changing (see function above) and responses are asynchronous
var handleTwilioResponse = function(promise, params){
  promise.then(function(message) {
    params.twilioResponse.status = 'SUCCESS';
    params.twilioResponse.message = message.sid;
  },function(error) {
    params.twilioResponse.status = 'FAIL';
    params.twilioResponse.message = error.message;
  }).fin((function(callback){
    return function(){
      callback(params.twilioResponse);
      if(params.counter.count === params.user.emergencyContacts.length - 1){
        params.user.save(function(err){
          if(err){
            params.res.status(400).send('Error saving last message statuses');
          } else {
            params.res.status(200).send();
          }
        });
      }
      params.counter.count++;
    };
  })(params.responseCallback));
};
