var expect = require('chai').expect;
var request = require('request');

var db = require('../server/db/config');
var User = require('../server/db/models/user');

/// User Actions - 1001 
/// These test cases test User actions. These are things a user can perform such as
/// signing in, signin out, or adding a contact. 
describe('User Actions:', function() {

  var requestWithSession = request.defaults({jar: true});

  beforeEach(function(done){      // create a user that we can then log-in with
    new User({
        'username': 'Fabio',
        'password': 'password'
    }).save(function(err, user){
        done();
      });
  });

  afterEach(function(done){
    // Drop User Collection
    User.collection.drop();
    done();
  });

  /// User Sign-in Test cases:
  describe('User Signin:', function(){
    /// Test Case: Signin-1001-001
    /// This test case will test that the server responds with a 400 code 
    /// when trying to sign in a user that does not currently exist
    it('Server should respond with 400 if user does not exist', function(done) {
        var options = {
          'method': 'POST',
          'followAllRedirects': true,
          'uri': 'http://127.0.0.1:5000/user/signin',
          'json': {
            'username': 'UserShouldNotExist',
            'password': 'password'
          }
        };

      requestWithSession(options, function(error, res, body) {
        expect(res.statusCode).to.equal(400);
        done();
      });
    });

    /// Test Case: Signin-1001-002
    /// This test case will test that the server responds with a 200 code 
    /// when trying to sign in a user that does exist. The server
    /// should also send back the user object to the client. 
    it('Server should respond with 200 if user does exist and send back the user object', function(done) {
        var options = {
          'method': 'POST',
          'followAllRedirects': true,
          'uri': 'http://127.0.0.1:5000/user/signin',
          'json': {
            'username': 'Fabio',
            'password': 'password'
          }
        };

      requestWithSession(options, function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.username).to.equal('Fabio');
        expect(res.body.emergencyContacts).to.be.empty;
        done();
      });
    });
  }); // 'User Signin'

//User Sign-up Test Cases:
describe('User Signup:', function(){
  /// Test Case: Signup-1001-001
  /// This test case will test that the server responds with a 409 code 
  /// when trying to signup a user that already has been added to the database.
  it('Server should respond with 409 if user already exists', function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:5000/user/signup',
        'json': {
          'username': 'Fabio',
          'password': 'password'
        }
      };

    requestWithSession(options, function(error, res, body) {
      expect(res.statusCode).to.equal(409);
      expect(res.body).to.equal('Account already exists');
      done();
    });
  });

  /// Test Case: Signup-1001-002
  /// This test case will test that the server responds with a 200 code 
  /// when trying to signup a new user.
  it('Server should respond with 200 if user was successfully added.', function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:5000/user/signup',
        'json': {
          'username': 'UserShouldBeAdded',
          'password': 'password'
        }
      };

    requestWithSession(options, function(error, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(res.body.username).to.equal('UserShouldBeAdded');
      expect(res.body.emergencyContacts).to.be.empty;
      done();
    });
  });
}); // 'User Signup'

/// User add contact Test cases:
describe('User addContact:', function(){
  /// Test Case: AddContact-1001-001
  /// This test case will test that the server responds with a 401 code 
  /// when trying to add a contact when the user is not logged in / authorized.
  it('Server should respond with 401 if user is not authorized', function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:5000/user/addContact',
        'json': {
          'username': 'UserShouldNotExist',
          'contactName': 'ContactName',
          'contactNumber': '1112223333'
        }
      };

    requestWithSession(options, function(error, res, body) {
      expect(res.statusCode).to.equal(401);
      expect(res.body).to.equal('Unauthorized: User not logged in');
      done();
    });
  });

  /// Test Case: AddContact-1001-002
  /// This test case will test that the server responds with a 200 code 
  /// when trying to add a contact that does not exist for that given user. 
  it('Server should respond with 200 when adding a new contact.', function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:5000/user/addContact',
        'json': {
          'username': 'Fabio',
          'contactName': 'ContactName',
          'contactNumber': '1112223333'
        }
      };

    requestWithSession(options, function(error, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(res.body.username).to.equal('Fabio');
      expect(res.body.emergencyContacts.length).to.equal(1);
      expect(res.body.emergencyContacts[0].contactName).to.equal('ContactName');
      expect(res.body.emergencyContacts[0].contactNumber).to.equal('1112223333');
      done();
    });
  });

  /// Test Case: AddContact-1001-003
  /// This test case will test that the server responds with a 409 code 
  /// when trying to add a contact number which already exists in the users contact list. 
  it('Server should respond with 409 if contact to add already exists', function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:5000/user/addContact',
        'json': {
          'username': 'Fabio',
          'contactName': 'ContactName',
          'contactNumber': '1112223333'
        }
      };

      User.findOne({ username: 'Fabio' })
        .exec(function(err, user) {
          user.emergencyContacts.push({contactName:'ContactName', contactNumber: '1112223333'});
          user.save(function(err, user){
            requestWithSession(options, function(error, res, body) {
              expect(res.statusCode).to.equal(409);
              done();
            });
          });
        });
  });
}); // 'User addContact'

}); // 'User Actions'

/// SMS Text Actions - 2001
/// These test cases test SMS controller actions. These are things the SMS module is responsible
/// for handling, mainly that being texting people. 
describe('SMS Actions:', function() {

    var requestWithSession = request.defaults({jar: true});

    beforeEach(function(done){      // create a user that we can then log-in with
      new User({
          'username': 'Fabio',
          'password': 'password'
      }).save(function(err, user){
          done();
        });
    });

    afterEach(function(done){
      // Drop User Collection
      User.collection.drop();
      done();
    });

    /// Test Case: SMSText-2001-001
    /// This test case will test that the server responds with a 401 code 
    /// when trying to text without being logged in / authorized.
    describe('SMS Send:', function(){
      it('Server should respond with 401 if user is not logged-in/authorized', function(done) {
          var options = {
            'method': 'POST',
            'followAllRedirects': true,
            'uri': 'http://127.0.0.1:5000/sms/text',
            'json': {
              'username': 'UserShouldNotExist',
              'password': 'password'
            }
          };

        requestWithSession(options, function(error, res, body) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.equal('Not Authorized');
          done();
        });
      });

      /// Test Case: SMSText-2001-002
      /// This test case will test that the server responds with a 200 code 
      /// when trying to text an empty list of contacts. An empty message status
      /// array should be returned.
      it('Server should respond with 200 and empty array when there are no contacts', function(done) {
          var options = {
            'method': 'POST',
            'followAllRedirects': true,
            'uri': 'http://127.0.0.1:5000/sms/text',
            'json': {
              'username': 'Fabio',
              'password': 'password'
            }
          };

        requestWithSession(options, function(error, res, body) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.empty;
          done();
        });
      });

      /// Test Case: SMSText-2001-003
      /// This test case will test that the server responds with a 200 code 
      /// when trying to text a list of contacts. An array of status objects is returned for each
      /// text corresponding to the success/failure of each. 
      it('Server should respond with 200 and response array when there are contacts', function(done) {
        var contactList = [{contactName:'Mom', contactNumber: '1111111111'},
                           {contactName:'Dad', contactNumber: '2222222222'},
                           {contactName:'Sister', contactNumber: '3333333333'}];
        var options = {
                'method': 'POST',
                'followAllRedirects': true,
                'uri': 'http://127.0.0.1:5000/sms/text',
                'json': {
                  'username': 'Fabio'
                 }
        };

        User.findOne({ username: 'Fabio' })
          .exec(function(err, user) {
            contactList.forEach(function(number){
              user.emergencyContacts.push(number);
            });
            user.save(function(err, user){
              requestWithSession(options, function(error, res, body) {
                expect(res.statusCode).to.equal(200);
                expect(res.body[0].message).to.contain('1111111111');
                expect(res.body[1].message).to.contain('2222222222');
                expect(res.body[2].message).to.contain('3333333333');
                done();
              });
            });
          });
      });

    /// Test Case: SMSText-2001-004
    /// This test case will test that the server responds with a 200 code 
    /// when trying to text a list of contacts. An array of status objects is returned for each
    /// text corresponding to the success/failure of each. This array should come back in 
    /// the same order of the texts sent. 
    it('Server should respond with SMS status in correct order', function(done) {
      var contactList = [{contactName:'Mom', contactNumber: '1111111111'},
                         {contactName:'Dad', contactNumber: '2222222222'},
                         {contactName:'Sister', contactNumber: '3333333333'},
                         {contactName:'Brother', contactNumber: '4444444444'},
                         {contactName:'Aunt', contactNumber: '5555555555'},
                         {contactName:'Uncle', contactNumber: '6666666666'},
                         {contactName:'Grandmother', contactNumber: '7777777777'},
                         {contactName:'Best Friend', contactNumber: '8888888888'},
                         {contactName:'My cat', contactNumber: '9999999999'},
                         {contactName:'God', contactNumber: '0000000000'}];
              var options = {
                      'method': 'POST',
                      'followAllRedirects': true,
                      'uri': 'http://127.0.0.1:5000/sms/text',
                      'json': {
                        'username': 'Fabio'
                       }
              };

              User.findOne({ username: 'Fabio' })
                .exec(function(err, user) {
                  contactList.forEach(function(number){
                    user.emergencyContacts.push(number);
                  });
                  user.save(function(err, user){
                    requestWithSession(options, function(error, res, body) {
                      expect(res.statusCode).to.equal(200);
                      expect(res.body[0].message).to.contain('1111111111');
                      expect(res.body[1].message).to.contain('2222222222');
                      expect(res.body[2].message).to.contain('3333333333');
                      expect(res.body[3].message).to.contain('4444444444');
                      expect(res.body[4].message).to.contain('5555555555');
                      expect(res.body[5].message).to.contain('6666666666');
                      expect(res.body[6].message).to.contain('7777777777');
                      expect(res.body[7].message).to.contain('8888888888');
                      expect(res.body[8].message).to.contain('9999999999');
                      expect(res.body[9].message).to.contain('0000000000');
                      done();
                    });
                  });
                });
          
      });
    }); // 'SMS Send'
}); // 'SMS Actions'
