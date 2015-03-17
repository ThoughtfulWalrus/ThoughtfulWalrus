var mongoose = require('mongoose');
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
