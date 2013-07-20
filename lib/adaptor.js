var parseString = require('xml2js').parseString
  , https = require('https')
  ;

function requestService(params, callback) {
    var paramFragments = [];
    for(var param in params) {
        paramFragments.push(param + '=' + params[param]);
    }
    var paramString = paramFragments.join('&');

    var requestOptions = {
        host: 'siteuptime.com',
        port: 443,
        path: '/api/rest/?' + paramString,
        method: 'GET'
      };

    var request = https.request(requestOptions, function(res) {
        res.on('data', function(data) {
            parseString(data, function (err, result) {
                if (result.rsp.err) {
                    var errorCode = result.rsp.err[0].$.code;
                    callback(new Error(errorCode));
                    return;
                }
                callback(null, result);
                return;
            });
        });
    });

    request.on('error', function(e) {
        console.error('error');
        console.error(e);
    });

    request.end();
}

function requestSessionToken(credentials, callback) {
    var params = {
        method: 'siteuptime.auth',
        Email: credentials.emailAddress,
        Password: credentials.password
    };
    requestService(params, function (err, response) {
        if (err) {
            callback(err);
            return;
        }

        var token = response.rsp.session[0].$.key;
        console.log('Token: ' + token);
        // var token = '12ba23g2f36d1a122cd623g2f36d1a122cd6';
        callback(null, token);
    });
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

module.exports = {
    requestSessionToken: requestSessionToken,
    requestService: requestService,
    validateCredentials: validateCredentials
};