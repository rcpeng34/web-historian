var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

// builds the response for the server to serve page data to the client
exports.serveAssets = function (response, location, contentType, status) {
  fs.readFile(location, function(err, data) {
    if(err) {
      throw err;
    }
    response.writeHead(status, {'Content-Type': contentType});
    response.end(data);
  });
};

exports.redirect = function (response, url) {
    response.writeHead(302, {'Location': url});
    response.end();
};

  // fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf-8', function(err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log('starting write head');
  //   console.log(data);
  //   // response.statusCode = 302;
  //   // response.setHeader('Location', '127.0.0.1:8080/' + url);
  //   response.writeHead(302, {'Location': '127.0.0.1:8080/' + url});
  //   response.end(data);
  // });

// exports.redirect = function (response, url) {
//   fs.readFile(archive.paths.siteAssets + '/loading.html', function(err, data) {
//     if (err) {
//       throw err;
//     }
//     console.log('starting write head');
//     var location = '127.0.0.1:8080/' + url;
//     console.log(location);
//     response.end();
//   });
// };
