var mongoose = require('mongoose');

/// Create userSchema with Mongoose. The schema contains a username and an array of emergency contacts. 
var userSchema = mongoose.Schema({
  username: { 
    type: String, 
    index: { unique: true },
  }, 
  emergencyContacts:[{ 
      contactName: String, 
      contactNumber: String
  }],
});


var User = mongoose.model('User', userSchema);

module.exports = User; 
