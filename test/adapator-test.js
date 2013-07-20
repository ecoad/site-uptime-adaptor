var assert = require('should')
  , adaptor = require('../lib/adaptor')
  , validConfig = require('./test-config') // Generate this site uptime related file yourself
  ;

describe('Adaptor', function() {
  describe('#getToken', function() {

    it('throws an error if no email address and password passed', function() {
      assert.throws(function() {
        adaptor.getToken();
      }, /Invalid input/);
    });

    it('executes the callback on success', function(done) {
      adaptor.getToken(validConfig.credentials, function(err, response) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('returns a non-blank string on success', function(done) {
      adaptor.getToken(validConfig.credentials, function(err, response) {
        if (err) {
          throw err;
        }
        if ((typeof response === 'string') && (response !== '')) {
          done();
        }
      });
    });

    it('return error callback on failure', function(done) {
      adaptor.getToken({emailAddress: 'no', password: 'no'}, function(err, response) {
        if (err && err.message === 'WRONG_DATA') {
          done();
        }
      });
    });

  });
});