var nock = require('nock');

// Mock valid token
nock('https://siteuptime.com:443')
  .get('/api/rest/?method=siteuptime.auth&Email=valid@example.com&Password=valid')
  .times(50).reply(200, "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<rsp stat=\"ok\">\r\n   <session key=\"82rpup7ocv8uj4jp369kgg7vf3\"/>\r\n</rsp>", { date: 'Sun, 21 Jul 2013 13:22:16 GMT',
  server: 'Apache/2.2.15 (CentOS)',
  expires: 'Thu, 19 Nov 1981 08:52:00 GMT',
  'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
  pragma: 'no-cache',
  'x-frame-options': 'SAMEORIGIN',
  'content-length': '110',
  connection: 'close',
  'content-type': 'text/xml' });

// Mock invalid token
nock('https://siteuptime.com:443')
  .get('/api/rest/?method=siteuptime.auth&Email=no&Password=no')
  .times(50).reply(200, "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<rsp stat=\"fail\">\r\n   <err code=\"WRONG_DATA\" msg=\"Wrong or empty password\" />\r\n</rsp>\r\n", { date: 'Sun, 21 Jul 2013 13:24:07 GMT',
  server: 'Apache/2.2.15 (CentOS)',
  'x-frame-options': 'SAMEORIGIN',
  'content-length': '126',
  connection: 'close',
  'content-type': 'text/xml' });

nock('https://siteuptime.com:443')
  .get('/api/rest/?method=siteuptime.monitors&AuthKey=82rpup7ocv8uj4jp369kgg7vf3')
  .times(50).reply(200, "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<rsp stat=\"ok\">\r\n  <monitors total=\"2\">\r\n    <monitor id=\"1234\" active=\"yes\" name=\"Mobile Image Server\" host=\"img1.example.com\" service=\"http\" port=\"0\" period=\"5\" location=\"ln\" timeout=\"25\" downsubject=\"img.example.com is DOWN\" upsubject=\"img.example.com is UP\" altemailalerts=\"\" sendalertafter=\"1\" dontsendupalert=\"no\" sendurlalert=\"no\" sendjabberalert=\"no\" sendalldownalerts=\"yes\" enablepublicstatistics=\"no\" addtostatuspage=\"yes\" current_status=\"Ok\"/>\n    <monitor id=\"5678\" active=\"yes\" name=\"Web Server\" host=\"www.example.com\" service=\"http\" port=\"0\" period=\"2\" location=\"ln\" timeout=\"25\" downsubject=\"\" upsubject=\"\" altemailalerts=\"\" sendalertafter=\"1\" dontsendupalert=\"no\" sendurlalert=\"no\" sendjabberalert=\"no\" sendalldownalerts=\"yes\" enablepublicstatistics=\"no\" addtostatuspage=\"yes\" current_status=\"Ok\"/>\n  </monitors>\r\n</rsp>", { date: 'Sun, 21 Jul 2013 15:40:43 GMT',
  server: 'Apache/2.2.15 (CentOS)',
  expires: 'Thu, 19 Nov 1981 08:52:00 GMT',
  'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
  pragma: 'no-cache',
  'x-frame-options': 'SAMEORIGIN',
  'content-length': '2751',
  connection: 'close',
  'content-type': 'text/xml' });

nock('https://siteuptime.com:443')
  .get('/api/rest/?method=siteuptime.monthlystatistics&AuthKey=82rpup7ocv8uj4jp369kgg7vf3&MonitorId=1234&Year=2013&Month=06')
  .times(50).reply(200, "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<rsp stat=\"ok\">\r\n    <dailystats year=\"2013\" month=\"6\" total=\"30\" timezone=\"PST+7.0\" numchecks=\"21414\" numfailures=\"1\" uptime=\"99.995%\">\r\n        <dailystat date=\"2013-06-01\" numchecks=\"713\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-02\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-03\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-04\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-05\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-06\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-07\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-08\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-09\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-10\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-11\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-12\" numchecks=\"713\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-13\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-14\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-15\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-16\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-17\" numchecks=\"713\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-18\" numchecks=\"712\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-19\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-20\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-21\" numchecks=\"714\" numoutages=\"1\" numfailures=\"1\" uptime=\"99.860%\"/>\r\n        <dailystat date=\"2013-06-22\" numchecks=\"712\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-23\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-24\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-25\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-26\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-27\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-28\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-29\" numchecks=\"715\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n        <dailystat date=\"2013-06-30\" numchecks=\"714\" numoutages=\"0\" numfailures=\"0\" uptime=\"100.000%\"/>\r\n    </dailystats>\r\n</rsp>", { date: 'Sun, 21 Jul 2013 15:53:34 GMT',
  server: 'Apache/2.2.15 (CentOS)',
  expires: 'Thu, 19 Nov 1981 08:52:00 GMT',
  'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
  pragma: 'no-cache',
  'x-frame-options': 'SAMEORIGIN',
  'content-length': '3351',
  connection: 'close',
  'content-type': 'text/xml' });

module.exports = {
  validCredentials: {emailAddress: 'valid@example.com', password: 'valid'},
  invalidCredentials: {emailAddress: 'no', password: 'no'},
  validMonitorId: 1234,
  validUptime: {year: '2013', month: '06'}
};