var http = require('http');
var httpHelpers = require('../web/http-helpers.js');
var fs = require('fs');
var archive = require('../helpers/archive-helpers.js');

exports.archiveUrl = function(url, callback) {
  http.get('http://' + url, function(res) {
    var body = '';
    res.on('data', function(chunk){
      body += chunk;
    });
    res.on('end', function(){
      fs.writeFile(archive.paths.archivedSites + '/' + url, body , function(){callback(res)});
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};
