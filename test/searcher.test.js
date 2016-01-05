var test     = require('tape');
var searcher = require('../lib/searcher');
var dir      = __dirname.split('/')[__dirname.split('/').length-1];
var file     = dir + __filename.replace(__dirname, '') + ' >';
var LF       = require('../lib/index');

test(file+' Construct Anita\'s Search Engine URL', function(t){
  var keywords = ['Anita', 'Czapla','Founders'];
  var expected = 'https://www.google.co.uk/search?q=Anita%20Czapla%20Founders';
  var result   = searcher.url(keywords);
  console.log(result);
  t.ok(result === expected, 'Search Engine Link is: '+result);
  t.end();
})

test(file+' Attempt to search without keywords 404 error', function(t) {

  searcher(null, function(err, url, html){
    t.ok(err === 404, 'Don\'t do that  ...')
    t.end();
  });
})

test(file+' Search for Anita\'s Profile Link in Search Engine', function(t) {
  var keywords = ['Anita', 'Czapla','Founders'];
  searcher(keywords, function(err, url, html){
    var link = 'https://www.linkedin.com/in/anitaczapla';
    t.ok(html.toString().indexOf(link) > -1, 'Search Results contain link: '+link)
    t.end();
  });
});

test(file+' Search for Abdi\'s Profile Link in Search Engine', function(t) {
  var keywords = ['Abdi', 'Ahmed','Founders'];
  searcher(keywords, function(err, url, html){
    // console.log(err, url, html.toString());
    var link = 'https://www.linkedin.com/in/abdi-ahmed-6b0384100';
    t.ok(html.toString().indexOf(link) > -1, 'Search Results contain link: '+link)
    t.end();
  });
})

test(file+' Search for Simons\'s Profile Link in Search Engine', function(t) {
  var keywords = ['Simon', 'Labondance','Founders', 'Coders'];
  searcher(keywords, function(err, url, html){
    var link = 'https://www.linkedin.com/in/simonlab';
    t.ok(html.toString().indexOf(link) > -1, 'Search Results contain link: '+link)
    t.end();
  });
});
