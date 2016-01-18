var searcher = require('./searcher');
var finder   = require('./finder');

module.exports = function(keywords, next) {
  searcher(keywords, function(err, url, html){
    if (err) {
      return next(err);
    }
    finder(url, html, function(err, data){
      return next(err, data);
    });
  });
};
