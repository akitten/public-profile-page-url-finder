var fs    = require('fs');
var Wreck = require('wreck');
var wreck = Wreck.defaults({
    headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36' }
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

/**
 * searcher searches our favourite search engine for keywords
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
    return next(404);
  }

  var url = construct_search_url( keywords );

  wreck.get(url, function (error, response, html) {

      if(error) {
        return next(error);
      }

      if(response.statusCode !== 200) {
        error = response.statusCode
      }

    return next(error, url, html);
  });
}
module.exports = searcher;
module.exports.url = construct_search_url;
