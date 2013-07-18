var adaptor = require('./adaptor')
  , sessionToken
  , config
  , callbackSuccess
  ;

function onToken(token) {
    sessionToken = token;
    requestStatus();
}

function requestStatus() {
    var params = {
        method: 'siteuptime.monitors',
        AuthKey: sessionToken
    };

    adaptor.requestService(params, function(err, response) {
        if (err && err.message === 'AUTH_EXPIRED') {
            adaptor.requestSessionToken(config.credentials, onToken);
            return;
        }
        onRequestSuccess(response);
    });
}

function onRequestSuccess(response) {
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

    callbackSuccess(servers);
}

function getStatus(onStatusSuccess) {
    callbackSuccess = onStatusSuccess;
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
        getStatus: getStatus
    };
};