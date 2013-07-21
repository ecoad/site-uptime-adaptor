var assert = require('should')
  , testBootstrap = require('./test-bootstrap')
  , adaptor = require('../lib/adaptor')
  ;

describe('Adaptor', function() {
  describe('#getToken', function() {

    it('throws an error if no email address and password passed', function() {
      assert.throws(function() {
        adaptor.getToken();
      }, /Invalid input/);
    });

    it('returns a non-blank string on success', function(done) {
      adaptor.getToken(testBootstrap.validCredentials, function(err, response) {
        if (err) {
          throw err;
        }
        if ((typeof response === 'string') && (response !== '')) {
          done();
        }
      });
    });

    it('return error callback on failure', function(done) {
      adaptor.getToken(testBootstrap.invalidCredentials, function(err, response) {
        if (err && err.message === 'WRONG_DATA') {
          done();
        }
      });
    });

  });
});