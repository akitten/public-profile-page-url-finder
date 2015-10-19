var test     = require('tape');
var searcher = require('../lib/searcher');


test('Construct Anita\'s Search Engine URL', function(t){
  var keywords = ['Anita', 'Czapla','Founders'];
  var expected = 'https://www.google.co.uk/search?q=Anita%20Czapla%20Founders';
  var result   = searcher.url(keywords);
  console.log(result);
  t.ok(result === expected, 'Search Engine Link is: '+result);
  t.end();
})

test('Attempt to search without keywords 404 error', function(t) {

  searcher(null, function(err, url, html){
    t.ok(err === 404, 'Don\'t do that  ...')
    t.end();
  });
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

test('Search for Abdi\'s Profile Link in Search Engine', function(t) {
  var keywords = ['Abdi', 'Ahmed','Founders'];
  searcher(keywords, function(err, url, html){
    // console.log(err, url, html.toString());
    var link = 'https://uk.linkedin.com/pub/abdi-ahmed/100/384/6b0';
    t.ok(html.toString().indexOf(link) > -1, 'Search Results contain link: '+link)
    t.end();
  });
})

test('Search for Simons\'s Profile Link in Search Engine', function(t) {
  var keywords = ['Simon', 'Labondance','Founders', 'Coders'];
  searcher(keywords, function(err, url, html){
    var link = 'https://uk.linkedin.com/in/simonlab';
    t.ok(html.toString().indexOf(link) > -1, 'Search Results contain link: '+link)
    t.end();
  });
})
