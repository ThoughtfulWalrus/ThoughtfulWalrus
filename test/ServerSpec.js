var expect = require('chai').expect;
var request = require('request');

var db = require('../server/db/config');
var User = require('../server/db/models/user');

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

  describe('User Signin:', function(){
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

describe('User Signup:', function(){
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
  it('Server should respond with 409 if user already exists.', function(done) {
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
      done();
    });
  });
}); // 'User Signup'

describe('User addContact:', function(){
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

    requestWithSession(options, function(error, res, body) {
      expect(res.statusCode).to.equal(200);
      requestWithSession(options, function(error, res, body) {
        expect(res.statusCode).to.equal(409);
        done();
      });
    });
  });
}); // 'User addContact'

}); // 'User Actions'

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

      it('Server should respond with 200 and response array when there are contacts', function(done) {
        this.timeout(10000)
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

              var options2 = {
                      'method': 'POST',
                      'followAllRedirects': true,
                      'uri': 'http://127.0.0.1:5000/sms/text',
                      'json': {
                        'username': 'Fabio'
                      }
                    };
              requestWithSession(options2, function(error, res, body) {
                expect(res.statusCode).to.equal(200);
                done();
              });
            });
        });

    it('Server should respond with SMS status in correct order', function(done) {
      this.timeout(10000)
      var options1 = {
              'method': 'POST',
              'followAllRedirects': true,
              'uri': 'http://127.0.0.1:5000/user/addContact',
              'json': {
                'username': 'Fabio',
                'contactName': 'ContactName',
                'contactNumber': '1111111111'
              }
            };
      var options2 = {
              'method': 'POST',
              'followAllRedirects': true,
              'uri': 'http://127.0.0.1:5000/user/addContact',
              'json': {
                'username': 'Fabio',
                'contactName': 'ContactName2',
                'contactNumber': '2222222222'
              }
            };
      var options3 = {
              'method': 'POST',
              'followAllRedirects': true,
              'uri': 'http://127.0.0.1:5000/user/addContact',
              'json': {
                'username': 'Fabio',
                'contactName': 'ContactName',
                'contactNumber': '3333333333'
              }
            };        
          requestWithSession(options1, function(error, res, body) {
            expect(res.statusCode).to.equal(200);
          });
          requestWithSession(options2, function(error, res, body) {
            expect(res.statusCode).to.equal(200);
          });
          requestWithSession(options3, function(error, res, body) {
            expect(res.statusCode).to.equal(200);
            var textOption = {
                    'method': 'POST',
                    'followAllRedirects': true,
                    'uri': 'http://127.0.0.1:5000/sms/text',
                    'json': {
                      'username': 'Fabio'
                    }
                  };
            requestWithSession(textOption, function(error, res, body) {
              expect(res.statusCode).to.equal(200);
              expect(res.body[0].message).to.contain('1111111111');
              expect(res.body[1].message).to.contain('2222222222');
              expect(res.body[2].message).to.contain('3333333333');
              done();
            });
          });
          
      });
    }); // 'SMS Send'
}); // 'SMS Actions'
