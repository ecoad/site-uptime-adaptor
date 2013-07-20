var assert = require('should')
  , siteAvailabilityJs = require('../')
  , validConfig = require('./test-config') // Generate this site uptime related file yourself
  ;

describe('siteAvailabilityJs', function() {

  describe('#status', function() {

    it('throws an error if no email address and password passed', function() {
      assert.throws(function() {
        siteAvailabilityJs.status();
      }, /Invalid input/);
    });

  });

  describe('#getStatus', function() {

/*
    it('returns a function', function() {
      siteAvailabilityJs.status(validConfig).getStatus.should.be.a('function');
    });
    it('executes the callback on success', function(done) {
      siteAvailabilityJs.status(validConfig).getStatus(function(response) {
        done();
      });
    });
*/
    it('returns a list of servers with their states', function(done) {
      siteAvailabilityJs.status(validConfig).getStatus(function(err, status) {
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