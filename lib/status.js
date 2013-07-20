var adaptor = require('./adaptor')
  , Q = require('q')
  , sessionToken
  , config
  , callbackSuccess
  ;

function formatStatus(response) {
    var monitors, formatted = [], monitor;

    monitors = response.rsp.monitors[0].monitor;

    for(var monitorKey in monitors) {
        monitor = monitors[monitorKey].$;
        formatted.push({
            id: monitor.id,
            name: monitor.name,
            host: monitor.host,
            status: monitor.current_status
        });
    }

    return formatted;
}

function requestStatus() {
    var deferred = Q.defer()
      , params = {
        method: 'siteuptime.monitors',
        AuthKey: sessionToken
    };

    adaptor.requestService(params, function(err, response) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(formatStatus(response));
        }
    });

    return deferred.promise;
}

function onRequestSuccess(response) {
    var monitors
      , servers = []
      , monitor
      ;

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

function getToken() {
    var deferred = Q.defer();
    adaptor.requestSessionToken(config.credentials, function(err, token) {
        if (err) {
            deferred.reject(err);
        } else {
            sessionToken = token;
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function getStatus(onStatusSuccess) {
    getToken().then(requestStatus).then(function(status) {
        onStatusSuccess(null, status);
    }, function (reason) {
        console.error(reason);
    }).done();;
}

module.exports = function(params) {
    adaptor.validateCredentials(params);
    config = params;
    return {
        getStatus: getStatus
    };
};