var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * the same paths will be used many times
 * all references to directory paths will use the paths defined below
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(){
};

// check if a url is in sites.txt
exports.isUrlInList = function(url, callback){
  fs.readFile(module.exports.paths.list, function(err, sites){
    if(err) {
      throw err;
    }
    // sites.txt is formatted as an object
    var siteObj = JSON.parse(sites);
    // once parsed, we can just see if the value exists
    callback(siteObj[url]);
  });
};

// adds a site to sites.txt
exports.addUrlToList = function(url){
  // grab the existing file
  fs.readFile(module.exports.paths.list, function(err, sites){
    if(err) {
      throw err;
    }
    // create an object from sites.txt
    var siteObj = JSON.parse(sites);
    // add url by setting the property
    siteObj[url] = true;
    // stringify the new object and overwrite
    // this guarantees know site is added twice
    var input = JSON.stringify(siteObj);
    fs.writeFile(module.exports.paths.list, input);
  });
};

exports.isURLArchived = function(url){
};
// downloads the html from the url and invokes a callback
// assume it downloads multiple urls or else it is the same as htmlfetcher
exports.downloadUrls = function(){
};
