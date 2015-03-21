var User = require('../db/models/user');
var jwt = require('jwt-simple');
var Q = require('q');
var authToken = require('../config/creds').distressAuthToken;

module.exports.signin = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  console.log('Signing in user: ' + username);
  console.log('Signing in password: ' + password);

  var findUser = Q.nbind(User.findOne, User);
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
  })
};

module.exports.signup = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  console.log('Signing up user: ' + username);
  console.log('Signing up password: ' + password);
  var create, newUser;
  var findOne = Q.nbind(User.findOne, User);

  findOne({ username: username })
    .then(function(user, err) {
      if (user) {
        next(new Error('User already exists'))
      }else{
        create = Q.nbind(User.create, User);
        newUser = {
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

  if (!token) {
    next(new Error('No token'));
  } else {
      var user = jwt.decode(token, authToken);

      User.findOne({ username: user.username })
        .exec(function(err,user) {
          if (!user) {
            res.status(401).send('Unauthorized: User not found!');
          } else {
            var contactToFind = undefined;

            for(var i = 0; i < user.emergencyContacts.length; i++){
              var contact = user.emergencyContacts[i];

              if(contact._id.equals(contactId)) {
                contactToFind = contact;
                break;
              }
            }

            // Check if the contact already exists
            if(contactToFind === undefined){
              res.status(400).send('Could not find contact with matching id to update.')
            }
            else{
              user.emergencyContacts[i].name = contactName;
              user.emergencyContacts[i].phone = contactNumber;
              user.save(function(err,user){
                console.log('Updating contact: ' + contactName + ' for user: ' + user.username);
                res.status(200).send(user);
              });
            }
          }
        });
    }
}

module.exports.addContact = function(req, res, next) {
  var contactName = req.body.contact.name;
  var contactNumber = req.body.contact.phone;
  console.log('Adding')
  var token = req.headers['x-access-token'];

  if (!token) {
    next(new Error('No token'));
  } else {
      var user = jwt.decode(token, authToken);

      User.findOne({ username: user.username })
        .exec(function(err,user) {
          if (!user) {
            res.status(401).send('Unauthorized: User not found!');
          } else {
            var newContact = {
              name: contactName,
              phone: contactNumber
            };

            var inContactList = user.emergencyContacts.map(function(contact) {
                                  return contact.phone;
                                }).indexOf(contactNumber);

            // Check if the contact already exists
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
}

module.exports.getContacts = function(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token) {
    next(new Error('No token'));
  } else {
      var user = jwt.decode(token, authToken);

      User.findOne({ username: user.username })
        .exec(function(err,user) {
          if (!user) {
            res.status(401).send('User not found!');
          }
          else{
            res.status(200).send(user.emergencyContacts);
          }
        });
    }
}



module.exports.checkAuth =  function (req, res, next) {
     // checking to see if the user is authenticated
     // grab the token in the header is any
     // then decode the token, which we end up being the user object
     // check to see if that user exists in the database
     var token = req.headers['x-access-token'];
     if (!token) {
       next(new Error('No token'));
     } else {
       var user = jwt.decode(token, authToken);

       var findUser = Q.nbind(User.findOne, User);
       findUser({username: user.username})
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


