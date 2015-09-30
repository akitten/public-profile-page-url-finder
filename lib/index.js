var searcher = require('./searcher');
var finder   = require('./finder');

module.exports = function(keywords, next) {
  searcher(keywords, function(err, url, html){
    finder(url, html, function(err, data){
      next(err, data);
    })
  })
}
