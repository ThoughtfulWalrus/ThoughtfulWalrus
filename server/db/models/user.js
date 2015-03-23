var mongoose = require('mongoose');
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

/// Create the userSchema database with Mongoose (which uses MongoDB). The schema contains a username and an array of emergency contacts.
var userSchema = mongoose.Schema({
  username: {type: String, index: { unique: true }, require: true},
  password:{type: String, require: true},
  firstName: {type: String, require: true},
  lastName: {type: String, require: true},
  emergencyContacts:[{name: String, phone: String, lastMsgStatus: String}],
  salt: String
});

userSchema.methods.comparePasswords = function (candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

userSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});


var User = mongoose.model('User', userSchema);

module.exports = User;
