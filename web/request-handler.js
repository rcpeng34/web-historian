var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var readFileHelper = function (response, location, contentType) {
  fs.readFile(location, function(err, data) {
    if(err) {
      throw err;
    }
    response.writeHead(200, {'Content-Type': contentType});
    response.write(data);
    console.log('data', data.toString());
    response.end();
  });
};



exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      readFileHelper(res, '../web/public/index.html', 'text/html');
    } else if (req.url ==='/styles.css') {
      readFileHelper(res, '../web/public/styles.css', 'text/css');
    } else if (req.url ==='/loading.html') {
      readFileHelper(res, '../web/public/loading.html', 'text/html');
    } else {

      var newUrl = req.url.slice(1);
      fs.readFile('../archives/sites.txt', function(err, sites){
        if(err) {
          throw err;
        }
        var siteObj = JSON.parse('{' + sites + '}');
        // if newUrl is in siteObj, get it from ./archives/sites
        // if it isn't, download and archive
        if (siteObj[newUrl]) {
          readFileHelper(res, '../archives/sites/'+newUrl, 'text/html');
        } else {


        }
      });
    }
  }


  // res.end(archive.paths.list);


};
