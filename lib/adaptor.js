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
                    callback(new Error(result.rsp.err[0].$.code));
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

function requestSessionToken(credentials, onToken) {
    var params = {
        method: 'siteuptime.auth',
        Email: credentials.emailAddress,
        Password: credentials.password
    };
    requestService(params, function(onToken, response) {
        // var token = response.rsp.session[0].$.key;
        var token = '12ba23g2f36d1a122cd623g2f36d1a122cd6';
        onToken(token);
    }.bind(this, onToken));
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