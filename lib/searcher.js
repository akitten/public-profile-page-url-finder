var fs    = require('fs');
var Wreck = require('wreck');
var wreck = Wreck.defaults({
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 5.1; rv:19.0) Gecko/20100101 Firefox/19.0' }
});

/**
 * construct_search_url
 * @param {Array} keywords - a set of keywords to search for
 * @returns {String} url - a valid "search engine" url
 */
function construct_search_url (keywords) {
  var url = 'https://www.google.co.uk/search?q=';
  url += encodeURIComponent( keywords.join(' ') );
  return url;
}
// console.log(construct_search_url(['Anita', 'Czapla','Founders']));
/**
 * searcher does the grunt work of searching our favourite search engine ...
 * @param {Array} keywords - a set of keywords to search for
 * e.g: [ FirstName, LastName, JobTitle, Company, Location ]
 * @param {function} next - the callback we should call once search is complete
 *  a callback passed into this method should accept two parameters:
 *  @param {Object} error an error object (set to null if no error occurred)
 *  @param {String} url - the search engine url we searched
 *  @param {String} html - the complete html for the search results
 */
function searcher (keywords, next) {

  if(!keywords || typeof keywords === 'undefined') {
    return callback(404);
  }
  var url = construct_search_url( keywords );
  wreck.get(url, function (error, response, html) {
    if (error || !response || response.statusCode !== 200) {
      console.log(" - - - URL FAIL >> " + url + "  - - - ");
      console.log(error)
      console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - \n')
      console.log(response.headers)
      console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - \n')
      console.log(response.reply)
      callback(404);
    }
    else {
      var re  = new RegExp('/', 'g');
      var dir = require('path').resolve(__dirname + '/../data');
      // console.log(dir)
      var filename = dir +'/' + url.replace('https://', '').replace(re,'_');
      // console.log(filename);
      fs.writeFile(filename, html.toString(), function(err, data){
        return next(null, url, html);
      })
    }
  });
}
module.exports = searcher;
module.exports.url = construct_search_url;
