var adaptor = require('./adaptor')
  , sessionToken
  , config
  , callbackSuccess
  , monitorId
  ;

function onToken(token) {
    sessionToken = token;
    requestMonthly();
}

function requestMonthly() {
    var params = {
        method: 'siteuptime.monthlystatistics',
        AuthKey: sessionToken,
        MonitorId: monitorId,
        Year: '2013',
        Month: '06'
    };

    adaptor.requestService(params, function(response) {
        var monthlyResponse = response.rsp.dailystats[0];
        var monthlyStats = {
            uptime: monthlyResponse.$.uptime,
            dailyStats: []
        };

        var dailyStat;
        for (var key in monthlyResponse.dailystat) {
            dailyStat = monthlyResponse.dailystat[key].$;
            monthlyStats.dailyStats.push({
                date: dailyStat.date,
                uptime: dailyStat.uptime
            });
        }

        /*
        var monitors, servers = [], monitor;

        monitors = response.rsp.monitors[0].monitor;
        for(var monitorKey in monitors) {
            monitor = monitors[monitorKey].$;
            servers.push({
                id: monitor.id,
                name: monitor.name,
                host: monitor.host,
                status: monitor.current_status
            });
        }

        onUptime(servers);
        */
    });
}

function onUptime(servers) {
    callbackSuccess(servers);
}

function getMonthly(requestMonitorId, onStatusSuccess) {
    callbackSuccess = onStatusSuccess;
    monitorId = requestMonitorId;
    if (sessionToken) {
        onToken(sessionToken);
    } else {
        adaptor.requestSessionToken(config.credentials, onToken);
    }
}

module.exports = function(params) {
    adaptor.validateCredentials(params);
    config = params;
    return {
        getMonthly: getMonthly
    };
};