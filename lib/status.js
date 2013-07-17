var adaptor = require('./adaptor')
  , sessionToken
  , mediator
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

    adaptor.requestService(params, function(response) {
        var monitors, servers = [], monitor;
        if (!response.rsp.monitors) {
            if (response.rsp.err[0]['$'].code == 'AUTH_EXPIRED') {
                requestSessionToken(config.credentials, onToken);
            }
            return;
        }
        monitors = response.rsp.monitors[0].monitor;
        for(var monitorKey in monitors) {
            monitor = monitors[monitorKey]['$'];
            servers.push({
                id: monitor.id,
                name: monitor.name,
                host: monitor.host,
                status: monitor.current_status
            });
        }

        onStatus(servers);
    });
}

function onStatus(servers) {
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

function validateCredentials(config) {

    if ((typeof config === 'undefined') || (typeof config.credentials === 'undefined')) {
        throw new Error('Invalid input: credentials missing');
    }
    for (var key in config.credentials) {
        if (typeof config.credentials[key] !== 'string' || config.credentials[key] === '') {
            throw new Error('Invalid input credential for ' + config.credentials[key]);
        }
    }
}

module.exports = function(params) {
    validateCredentials(params);
    config = params;
    return {
        getStatus: getStatus
    };
};