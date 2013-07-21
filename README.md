site-uptime-adaptor [![Build Status](https://travis-ci.org/ecoad/site-uptime-adaptor.png)](https://travis-ci.org/ecoad/site-uptime-adaptor)
============

siteuptime.com API wrapped in Node

## Examples
### Get session token

```javascript
var siteUptimeAdaptor = require('site-uptime-adaptor');

siteUptimeAdaptor.adaptor.getToken({
  emailAddress: 'myaccountemail@gmail.com',
  password: 'myaccountpassword'
}, function(err, token) {
  console.log(token);
});
```
##### Example output
```javascript
sdfoiusdofiusdfoiusdoifudf
```
### Get servers status

```javascript
...
siteUptimeAdaptor.status.getStatus(token, function(err, serverStatus) {
  console.log(serverStatus);
});
```
##### Example output
```javascript
[{
    id: '1111',
    name: 'My Site',
    host: 'example.com',
    status: 'Failed'
}, {
    id: '123123',
    name: 'image server',
    host: 'img1.example.com',
    status: 'Ok'
}]
```
### Get uptime for a server

```javascript
...
  var monitorRequest = {
    monitorId: 1111,
    year: '2013',
    month: '06'
  };

  siteUptimeAdaptor.uptime.getMonthly(token, monitorRequest, function(err, serverStatus) {
    console.log(serverStatus);
  });
```
##### Example output
```javascript
{ uptime: '99.995%',
  dailyStats:
   [ { date: '2013-06-01', uptime: '100.000%' },
     { date: '2013-06-02', uptime: '100.000%' },
    ...
     { date: '2013-06-20', uptime: '100.000%' },
     { date: '2013-06-21', uptime: '99.860%' },
     { date: '2013-06-30', uptime: '100.000%' } ]     
}
```
