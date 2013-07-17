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
                callback(result);
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
        var token = response.rsp.session[0]['$']['key'];
        onToken(token);
    }.bind(this, onToken));
}

module.exports = {
    requestSessionToken: requestSessionToken,
    requestService: requestService
};