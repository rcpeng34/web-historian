var http = require('http');
var httpHelpers = require('../web/http-helpers.js');
var fs = require('fs');
var archive = require('../helpers/archive-helpers.js');

exports.archiveUrl = function(url, callback) {
  // console.log('url', url, '| typeof url', typeof(url), '| callback', callback);
  // var response;

// this was something from stack overflow, i don't think works
// replace url in the get with options
/*  var options = require('url').parse( url );
options.rejectUnauthorized = false;
options.agent = new http.Agent( options );*/

  // http.get(url, function(res){
  //   // response = res;
  //   console.log(res);
  //   // callback(res);
  // }).on('error', function(err) {
  //   console.log('got an error', err.message);
  // });
  http.get('http://' + url, function(res) {
    var body = '';
    res.on('data', function(chunk){
      body += chunk;
    });
    res.on('end', function(){
      // fs.open(archive.paths.archivedSites + '/' + url, 'w', function(){
      // })
      fs.writeFile(archive.paths.archivedSites + '/' + url, body , function(){callback(res)});
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};
