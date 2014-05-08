var http = require('http');
var httpHelpers = require('../web/http-helpers.js');

exports.archiveUrl = function(url, callback) {
  console.log('url', url, '| callback', callback);
  var response;

// this was something from stack overflow, i don't think works
// replace url in the get with options
/*  var options = require('url').parse( url );
options.rejectUnauthorized = false;
options.agent = new http.Agent( options );*/

  http.get(url, function(res){
    // response = res;
    console.log(res);
    // callback(res);
  }).on('error', function(err) {
    console.log('got an error', err.message);
  });
};
