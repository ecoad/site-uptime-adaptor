var adaptor = require('./adaptor');

function getStatus(token, onStatus) {
  var params = {
    method: 'siteuptime.monitors',
    AuthKey: token
  };

  adaptor.requestService(params, function(err, response) {
    if (err) {
      onStatus(err);
    } else {
      onStatus(null, formatStatus(response));
    }
  });
}

function formatStatus(response) {
  var monitors
   , formatted = []
   , monitor
   ;

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

module.exports = {
  getStatus: getStatus
};