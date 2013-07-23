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

  // console.log('siteuptime API: ' + requestOptions.path);

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

function getToken(credentials, callback) {
    validateCredentials(credentials);
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
        callback(null, token);
    });
}

function validateCredentials(credentials) {
  if (typeof credentials === 'undefined') {
    throw new Error('Invalid input: credentials missing');
  }
  if (typeof credentials.emailAddress === 'undefined') {
    throw new Error('Invalid input: emailAddress missing');
  }
  if (typeof credentials.password === 'undefined') {
    throw new Error('Invalid input: password missing');
  }
}

module.exports = {
  getToken: getToken,
  requestService: requestService,
  validateCredentials: validateCredentials
};