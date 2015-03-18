var User = require('../db/models/user');

module.exports.signin = function(req, res) {
  var username = req.body.username;

  console.log('Signing in user: ' + username);

  User.findOne({ username: username })
    .exec(function(err,user) {
      if (!user) {
        res.status(400).send('Bad request: User not found');
      } else {
        console.log('Successful login');
        res.status(200).send(user);
      }
  });
};

module.exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  console.log('Signing up user: ' + username);

  User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password,
          emergencyContacts: []
        });
        newUser.save(function(err, newUser) {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).send(newUser);
        });
      } else {
        res.status(409).send('Account already exists');
      }
    });
};

module.exports.addContact = function(req, res) {
  var username = req.body.username;
  var contactName = req.body.contactName;
  var contactNumber = req.body.contactNumber;

  console.log('Adding Contact: ' + contactName + ' for ' + username);

  User.findOne({ username: username })
    .exec(function(err,user) {
      if (!user) {
        res.status(401).send('Unauthorized: User not logged in');
      } else {
        var newContact = { 
          contactName: contactName, 
          contactNumber: contactNumber
        };

        var inContactList = user.emergencyContacts.map(function(contact) { 
                              return contact.contactNumber; 
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
};


