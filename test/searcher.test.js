var test     = require('tape');
// var fs       = require('fs');
var searcher = require('../lib/searcher');

test('Construct Anita\'s Search Engine URL', function(t){
  var keywords = ['Anita', 'Czapla','Founders'];
  var expected = 'https://www.google.co.uk/search?q=Anita%20Czapla%20Founders';
  var result   = searcher.url(keywords);
  console.log(result);
  t.ok(result === expected, 'Search Engine Link is: '+result);
  t.end();
})

test('Search for Anita\'s Profile Link in Search Engine', function(t) {
  var keywords = ['Anita', 'Czapla','Founders'];
  searcher(keywords, function(err, url, html){
    // console.log(err, url, html.toString());
    var link = 'https://uk.linkedin.com/in/anitaczapla';
    t.ok(html.toString().indexOf(link) > -1, 'Search Results contain link: '+link)
    t.end();
  });
})
