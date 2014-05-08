var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  // define behavior on initial page load
  if (req.method === 'GET') {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html', 'text/html', 200);
    } else if (req.url ==='/styles.css') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/styles.css', 'text/css', 200);
    } else if (req.url ==='/loading.html') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', 'text/html', 200);
    }
  }
  // url requests come in as posts
  if(req.method === 'POST') {
    // incrementally aggregate packets for the complete request
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
        // if the url is in sites.txt, it has been archived
        // serve it up!
        httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + url, 'text/html', 200);
      } else {
        // since it wasn't in sites.txt, we have to add it
        archive.addUrlToList(url);
        // download the url, and serve it once it has been downloaded
        archive.downloadUrls(url, function(response){
          httpHelpers.serveAssets(response, archive.paths.archivedSites + '/' + url, 'text/html', 302);
        });
      }
    });
  }
};
