var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
};

exports.isUrlInList = function(url){
  fs.readFile(module.exports.paths.list, function(err, sites){
    if(err) {
      throw err;
    }
    var siteObj = JSON.parse(sites);
    // if newUrl is in siteObj, get it from ./archives/sites
    // if it isn't, download and archive
    if (siteObj[url]) {
      return true;
    } else {
      return false;
    }
  });
};

exports.addUrlToList = function(url){
  fs.readFile(module.exports.paths.list, function(err, sites){
    if(err) {
      throw err;
    }
    var siteObj = JSON.parse(sites);
    siteObj[url] = true;
    var input = JSON.stringify(siteObj);
    fs.writeFile(module.exports.paths.list, input);
  });
};

exports.isURLArchived = function(url){
};

exports.downloadUrls = function(url, cbFunc){
  cbFunc();
};
