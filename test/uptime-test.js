var assert = require('should')
  , siteAvailabilityJs = require('../')
  , validConfig = require('./test-config') // Generate this site uptime related file yourself
  , adaptor = require('../lib/adaptor') // Generate this site uptime related file yourself
  ;

describe('siteAvailabilityJs', function() {

  describe('#getMonthly', function() {

    it('returns a function', function() {
      siteAvailabilityJs.uptime.getMonthly.should.be.a('function');
    });

    it('returns the uptime value for each day in the month', function(done) {
      var monitorRequest = {
        monitorId: validConfig.servers.activeId,
        year: '2013',
        month: '06'
      };

      adaptor.getToken(validConfig.credentials, function(tokenError, token) {
        if (tokenError) throw tokenError;

        siteAvailabilityJs.uptime.getMonthly(token, monitorRequest, function(err, serverUptime) {
          if (err) throw err;

          if (typeof serverUptime.uptime !== 'string') {
            throw new Error('Uptime propery not present');
          }

          if (typeof serverUptime.dailyStats !== 'object') {
            throw new Error('dailyStats not present');
          }

          if (serverUptime.dailyStats.length !== 30) {
            throw new Error('Expected 30 daily stats, got ' + serverUptime.dailyStats.length);
          }

          if ((typeof serverUptime.dailyStats[0].date !== 'string') &&
             (typeof serverUptime.dailyStats[0].uptime !== 'string')) {
            throw new Error('Invalid daily stats format');
          }

          done();
        });
      });
    });

    // Siteuptime create invalid XML - too difficult to test
    //
    // it('returns error on invalid server ID', function(done) {
    //   var monitorRequest = {
    //     monitorId: '256734',
    //     year: '2013',
    //     month: '06'
    //   };

    //   adaptor.getToken(validConfig.credentials, function(tokenError, token) {
    //     if (tokenError) throw tokenError;

    //     siteAvailabilityJs.uptime.getMonthly(token, monitorRequest, function(err) {
    //       if (err) {
    //         done();
    //       }
    //     });

    //   });
    // });

  });
});