var assert = require('should')
  , testBootstrap = require('./test-bootstrap')
  , siteAvailabilityJs = require('../')
  , adaptor = require('../lib/adaptor')
  ;

describe('siteAvailabilityJs', function() {

  describe('#getStatus', function() {

    it('returns a function', function() {
      siteAvailabilityJs.status.getStatus.should.be.a('function');
    });

    it('returns a list of servers with their states', function(done) {
      adaptor.getToken(testBootstrap.validCredentials, function(err, token) {
        if (err) throw err;

        siteAvailabilityJs.status.getStatus(token, function(err, status) {
          var server, stringProperty, stringProperties = ['id', 'host', 'status', 'name'];
          for (var key in status) {
            server = status[key];
            for (var stringKey in stringProperties) {
              stringProperty = stringProperties[stringKey];
              if (typeof server[stringProperty] !== 'string' || server[stringProperty] === '') {
                throw new Error('Server ' + stringProperty + ' incorrect: ' + server[stringProperty]);
              }
            }
          }
          status.should.be.a('object');
          done();
        });

      });

    });

  });
});