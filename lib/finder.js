
var cheerio = require('cheerio');
/**
 * finder method finds LinkedIn profile links in a GOOG SERP
 * @param {String} url - a valid Linkedin profile url
 * @param {String} html - the full html for the public profile page
 * @param {Function} next - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {Objectj} error an error object (set to null if no error occurred)
 *  @param {Array} links - valid linkedin link(s)
 */
module.exports = function profile(url, html, next) {
  // console.log(url, html);
  var $ = cheerio.load(html); // use Server-Side JQuery to access DOM
  var data = { url: url };    // store all parsed data inside data object
  data.links = [];
  var links = $('._Rm');
  // console.log(links);
  var i = 0; // re-useable iterator
  for(i = 0; i < links.length; i++){
    var base = links[i].children[0].data, highlight = '';
    // console.log(base);
    if( base && base.match(/linkedin.com/) ) {

      var child = links[i].children[0].next;
      // console.log(child);
      if(child){
      highlight = links[i].children[0].next.children[0].data;
      }
      data.links.push(base+highlight);
    }
  }
  next(null, data);
}
