var User = require('../db/models/user');


module.exports.signin = function(req, res) {
  var username = req.body.username;

  console.log('Signing in user: ' + username);

  User.findOne({ username: username })
    .exec(function(err,user) {
      if (!user) {
        res.redirect('/signin');
      } else {
        console.log('Successful login');
        res.send(200, user.emergencyContacts);
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
            res.send(500, err);
          }
          res.redirect('/');
        });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
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
        res.redirect('/signin');
      } else {
        user.emergencyContacts.push({ 
          contactName: contactName, 
          contactNumber:contactNumber
        });

        user.save(function(err,link){
          res.redirect('/');
          return;
        });
      }
  });
};


