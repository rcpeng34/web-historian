var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, '../web/public/index.html', 'text/html', 200);
    } else if (req.url ==='/styles.css') {
      httpHelpers.serveAssets(res, '../web/public/styles.css', 'text/css', 200);
    } else if (req.url ==='/loading.html') {
      httpHelpers.serveAssets(res, '../web/public/loading.html', 'text/html', 200);
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
        httpHelpers.serveAssets(res, '../archives/sites/' + url, 'text/html', 200);
      } else {
        archive.addUrlToList(url);
        archive.downloadUrls(url, function(){
          httpHelpers.serveAssets(res, '../archives/sites/' + url, 'text/html', 302);
        });
      }
    });
  }
};



  // res.end(archive.paths.list);

    //   var newUrl = req.url.slice(1);
    //   fs.readFile('../archives/sites.txt', function(err, sites){
    //     if(err) {
    //       throw err;
    //     }
    //     var siteObj = JSON.parse('{' + sites + '}');
    //     // if newUrl is in siteObj, get it from ./archives/sites
    //     // if it isn't, download and arcive
    //     if (siteObj[newUrl]) h{
    //       httpHelpers.serveAssets(res, '../archives/sites/'+newUrl, 'text/html');
    //     } else {


    //     }
    //   });
    // }
        // } else {
        //   siteObj[url] = true;
        //   var input = JSON.stringify(siteObj);
        //   fs.writeFile('../archives/sites.txt', input);
        //   res.end();
        // }
