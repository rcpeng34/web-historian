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
