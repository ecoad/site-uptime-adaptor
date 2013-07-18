var assert = require('should')
  , siteAvailabilityJs = require('../')
  , validConfig = require('./test-config') // Generate this site uptime related file yourself
  ;

describe('siteAvailabilityJs', function() {

  describe('#uptime', function() {

    it('throws an error if no email address and password passed', function() {
      assert.throws(function() {
        siteAvailabilityJs.uptime();
      }, /Invalid input/);
    });

  });

  describe('#getMonthly', function() {

    it('returns a function', function() {
      siteAvailabilityJs.uptime(validConfig).getMonthly.should.be.a('function');
    });

    it('executes the callback on success', function(done) {
      siteAvailabilityJs.uptime(validConfig).getMonthly(validConfig.servers.activeId, function() {
        done();
      });
    });

    it('returns the uptime value for each day in the month', function() {
      siteAvailabilityJs.uptime(validConfig).getMonthly(validConfig.servers.activeId, function(uptime) {
        uptime.should.be.a('object');
      });
    });

  });
});