var User = require('../db/models/user');
var jwt = require('jwt-simple');
var Q = require('q');
var authToken = require('../config/creds').distressAuthToken;

module.exports.signin = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var findUser = Q.nbind(User.findOne, User);

  console.log('Signing in user: ' + username);
  console.log('Signing in password: ' + password);

  findUser({ username: username })
    .then(function(user, err) {
      if (!user || err) {
        res.status(401).send('Bad request: User not found');
      } else {
        return user.comparePasswords(password)
          .then(function(validPassword) {
            if (validPassword) {
              var token = jwt.encode(user, authToken);
              res.json({token: token});
              console.log('Successful login');
            } else {
              return next(new Error('No user'));
            }
          });
      }
  }).fail(function(error){
    next(error);
  });
};

module.exports.signup = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var create = Q.nbind(User.create, User);
  var findOne = Q.nbind(User.findOne, User);

  console.log('Signing up user: ' + username);
  console.log('Signing up password: ' + password);

  findOne({ username: username })
    .then(function(user, err) {
      if (user) {
        next(new Error('User already exists'));
      }else{
        var newUser = {
          username: username,
          password: password,
          emergencyContacts: []
        };
        return create(newUser);
      }
    }).then(function(user){
      var token = jwt.encode(user, authToken);
      res.json({token: token});
    }).fail(function(error){
      next(error);
    });
};

module.exports.updateContact = function(req, res, next) {
  var contactId = req.body.contact._id;
  var contactName = req.body.contact.name;
  var contactNumber = req.body.contact.phone;
  var token = req.headers['x-access-token'];
  var findOne = Q.nbind(User.findOne, User);

  if (!token) {
    next(new Error('No token'));
  } else {
      var user = jwt.decode(token, authToken);
      findOne({ username: user.username })
        .then(function(user, err) {
          if (!user) {
            res.status(401).send('Unauthorized: User not found!');
          } else {
            var contactToFind;

            user.emergencyContacts.forEach(function(contact){
              if (contact._id.equals(contactId)){
                contactToFind = contact;
              }
            });

            // Check if the contact doesn't exist
            if(contactToFind === undefined){
              res.status(400).send('Could not find contact with matching id to update.');
            }else{
              contactToFind.name = contactName;
              contactToFind.phone = contactNumber;
              user.save(function(err,user){
                console.log('Updating contact: ' + contactName + ' for user: ' + user.username);
                res.status(200).send(user);
              });
            }
          }
        });
    }
};

module.exports.addContact = function(req, res, next) {
  var contactName = req.body.contact.name;
  var contactNumber = req.body.contact.phone;
  console.log('Adding');
  var token = req.headers['x-access-token'];
  var findOne = Q.nbind(User.findOne, User);

  if (!token) {
    next(new Error('No token'));
  } else {
      var user = jwt.decode(token, authToken);
      // need to use Q library
      findOne({ username: user.username })
        .then(function(user, err) {
          if (!user) {
            res.status(401).send('Unauthorized: User not found!');
          } else {
            var newContact = {
              name: contactName,
              phone: contactNumber,
              lastMsgStatus: 'N/A'
            };

            // map return a list of the contact phone numbers.
            // indexOf checks if the contactNumber is one of the phone numbers
            // we are checking for duplicates based on phone number.
            var inContactList = user.emergencyContacts.map(function(contact) {
                                  return contact.phone;
                                }).indexOf(contactNumber);

            // Check if the contact doesn't exist
            if(inContactList === -1){
              user.emergencyContacts.push(newContact);
              user.save(function(err,user){
                res.status(200).send(user);
              });
            }
            else{
              res.status(409).send('Resource exists: Contact already in list');
            }
          }
        });
    }
};

module.exports.deleteContact = function(req, res, next) {
  var contactName = req.body.contact.name;
  var contactId = req.body.contact._id;
  var token = req.headers['x-access-token'];
  var findOne = Q.nbind(User.findOne, User);

  if (!token) {
    next(new Error('No token'));
  } else {
    var user = jwt.decode(token, authToken);
    findOne({ username: user.username })
      .then(function(user, err) {
        if (!user) {
          res.status(401).send('Unauthorized: User not found!');
        } else {
          user.emergencyContacts.forEach(function(contact, i)  {
            if(contact._id.equals(contactId)) {
              user.emergencyContacts.splice(i, 1);
            }
          });
          user.save(function(err,user){
            console.log('Deleting contact: ' + contactName + ' for user: ' + user.username);
            res.status(200).send(user);
          });
        }
      });
  }
};

module.exports.getContacts = function(req, res, next) {
  var token = req.headers['x-access-token'];
  var findOne = Q.nbind(User.findOne, User);

  if (!token) {
    next(new Error('No token'));
  } else {
      var user = jwt.decode(token, authToken);
      //need to use Q library
      findOne({ username: user.username })
        .then(function(user, err) {
          if (!user) {
            res.status(401).send('User not found!');
          }
          else{
            res.status(200).send(user.emergencyContacts);
          }
        });
    }
};



module.exports.checkAuth =  function (req, res, next) {
     // checking to see if the user is authenticated
     // grab the token in the header is any
     // then decode the token, which we end up being the user object
     // check to see if that user exists in the database
     var token = req.headers['x-access-token'];
     var findOne = Q.nbind(User.findOne, User);
     if (!token) {
       next(new Error('No token'));
     } else {
       var user = jwt.decode(token, authToken);
       findOne({username: user.username})
         .then(function (foundUser) {
           if (foundUser) {
             res.send(200);
           } else {
             res.send(401);
           }
         })
         .fail(function (error) {
           next(error);
         });
     }
};

