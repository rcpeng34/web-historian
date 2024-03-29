var path = require('path');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
var htmlFetcher = require('../workers/htmlfetcher.js');
var archive = require('../helpers/archive-helpers.js');

exports.handleRequest = function (req, res) {
  // define behavior on initial page load
  if (req.method === 'GET') {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html', 'text/html', 200);
    } else if (req.url ==='/styles.css') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/styles.css', 'text/css', 200);
    } else /*(req.url ==='/loading.html')*/ {
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
      url = url.slice(4);
      // url is now exactly what is in the input form
      // have to use a callback below because it's asynchronous
      archive.isUrlInList(url, function(exists) {
        if (exists) {
        // if the url is in sites.txt, it has been archived
        // serve it up!
          httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + url, 'text/html', 200);
        } else {
        // since it wasn't in sites.txt, we have to add it
          archive.addUrlToList(url);
          console.log('added to list, calling helpers redirect');
          httpHelpers.redirect(res, url);
        }
      });
    });
  }
};
        // // download the url, and serve it once it has been downloaded
        //   htmlFetcher.archiveUrl(url, function(){
        //     // console.log('right before serving assets');
        //     console.log('response', res);
        //     httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + url, 'text/html', 302);
        //   });
