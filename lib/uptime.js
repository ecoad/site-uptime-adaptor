var adaptor = require('./adaptor');

function getMonthly(token, monitorInformation, callback) {

  var params = {
    method: 'siteuptime.monthlystatistics',
    AuthKey: token,
    MonitorId: monitorInformation.monitorId,
    Year: monitorInformation.year,
    Month: monitorInformation.month
  };

  adaptor.requestService(params, function(err, response) {
    if (err) {
      callback(err);
    } else if (typeof response.rsp.dailystats === 'undefined') {
      callback(new Error('Invalid monitor ID'));
    } else {
      callback(null, formatResponse(response));
    }
  });
}

function formatResponse(response) {
  var monthlyResponse = response.rsp.dailystats[0]
    , monthlyStats = {
        uptime: monthlyResponse.$.uptime,
        dailyStats: []
      }
    , dailyStat
    ;

  for (var key in monthlyResponse.dailystat) {
    dailyStat = monthlyResponse.dailystat[key].$;
    monthlyStats.dailyStats.push({
      date: dailyStat.date,
      uptime: dailyStat.uptime
    });
  }

  return monthlyStats;
}

module.exports = {
  getMonthly: getMonthly
};