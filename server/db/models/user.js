var mongoose = require('mongoose');

/// Create the userSchema database with Mongoose (which uses MongoDB). The schema contains a username and an array of emergency contacts. 
var userSchema = mongoose.Schema({
  username: { 
    type: String, 
    index: { unique: true },
  }, 
  password:{
    type: String
  },
  emergencyContacts:[{ 
      contactName: String, 
      contactNumber: String
  }],
});

var User = mongoose.model('User', userSchema);

module.exports = User; 
