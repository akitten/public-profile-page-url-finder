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
  var links = $('.r');
  var titleLinks = $('.r');
  // console.log(titleLinks[0].children[0].attribs.href);
  // console.log('links:', links);
  // console.log('children', links[0].children);
  var i = 0;
  for(i=0; i < titleLinks.length; i++) {
    var link = titleLinks[i].children[0].attribs.href;
    console.log(link);
    if( link && link.match(/linkedin.com/) ) {
        data.links.push(link);
    }
  }
  next(null, data);
}
