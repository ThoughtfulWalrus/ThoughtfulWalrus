// var User = require('../server/db/models/user');

module.exports.signin = function(req, res) {
  console.log('Signing in user');
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err,user) {
      if (!user) {
        res.redirect('/signin');
      } else {
        console.log('user found')
        var savedPassword = user.password;
        //var contactList = User.getEmergencyContacts();
        res.send(200, contactList);
      }
  });
};

module.exports.signup = function(req, res) {
  console.log('Signing up user');
  // var username = req.body.username;
  // var password = req.body.password;

  // User.findOne({ username: username })
  //   .exec(function(err, user) {
  //     if (!user) {
  //       var newUser = new User({
  //         username: username,
  //         password: password
  //       });
  //       newUser.save(function(err, newUser) {
  //         if (err) {
  //           res.send(500, err);
  //         }
  //         util.createSession(req, res, newUser);
  //       });
  //     } else {
  //       console.log('Account already exists');
  //       res.redirect('/signup');
  //     }
  //   });
};