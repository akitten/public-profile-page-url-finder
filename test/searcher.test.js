var test     = require('tape');
var searcher = require('../lib/searcher');
var dir      = __dirname.split('/')[__dirname.split('/').length-1];
var file     = dir + __filename.replace(__dirname, '') + ' >';
var LF       = require('../lib/index');

test(file+' Construct Anita\'s Search Engine URL', function(t){
  var keywords = ['Anita', 'Czapla','Founders'];
  var expected = 'https://www.google.co.uk/search?q=Anita%20Czapla%20Founders';
  var result   = searcher.url(keywords);
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
    var link = 'https://uk.linkedin.com/in/anitaczapla';
    t.ok(html.toString().indexOf(link) > -1, 'Search Results contain link: '+link)
    t.end();
  });
});

test(file+' Search for Abdi\'s Profile Link in Search Engine', function(t) {
  var keywords = ['Abdi', 'Ahmed','Founders'];
  searcher(keywords, function(err, url, html){
    // console.log(err, url, html.toString());
    var link = 'https://uk.linkedin.com/in/abdi-ahmed-6b0384100';
    t.ok(html.toString().indexOf(link) > -1, 'Search Results contain link: '+link)
    t.end();
  });
})

test(file+' Search for Simons\'s Profile Link in Search Engine', function(t) {
  var keywords = ['Simon', 'Labondance','Founders', 'Coders'];
  searcher(keywords, function(err, url, html){
    var link = 'https://uk.linkedin.com/in/simonlab';
    t.ok(html.toString().indexOf(link) > -1, 'Search Results contain link: '+link)
    t.end();
  });
});

test(file+' Attempt to search when Google block the request', function(t) {
  var keywords = ['request', 'blocked'];

  //'https://www.google.co.uk'
  var nock = require('nock');
  var scope = nock('https://www.google.co.uk')
            .get('/search?q=request%20blocked')
            .reply(302, 'Redirect to captcha');

  searcher(keywords, function(err, url, html){
    t.ok(err === 302, 'Status code 302 when blocked by Google')
    t.ok(html.toString() === 'Redirect to captcha', 'Return captcha page when blocked by Google');
    t.end();
  });
});

test(file+' Handle error and check that the response is undefined', function(t) {
  var keywords = ['error', 'error'];

  //'https://www.google.co.uk'
  var nock = require('nock');
  var scope = nock('https://www.google.co.uk')
            .get('/search?q=error%20error')
            .replyWithError('something awful happened');

  searcher(keywords, function(err, url, html){
    t.ok(html === undefined, 'the html response is not defined');
    t.ok(err.output.payload.message === 'something awful happened', 'The message of the error is : something awful happened');
    t.end();
  });
});
