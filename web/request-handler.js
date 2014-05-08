var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html', 'text/html', 200);
    } else if (req.url ==='/styles.css') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/styles.css', 'text/css', 200);
    } else if (req.url ==='/loading.html') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', 'text/html', 200);
    }
  }
  if(req.method === 'POST') {
    var url = '';
    req.on('data', function(chunk) {
      url += chunk;
    });

    req.on('end', function(){
      console.log(url);
      // at this point url is a string of form 'url=*inputfield*'
      url = url.slice(4);
      // url is now exactly what is in the input form
      if(archive.isUrlInList(url)) {
        httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + url, 'text/html', 200);
      } else {
        archive.addUrlToList(url);
        archive.downloadUrls(url, function(){
          httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + url, 'text/html', 302);
        });
      }
    });
  }
};
