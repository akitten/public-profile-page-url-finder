var test    = require('tape');
var fs      = require('fs');
var finder = require('../lib/finder');

test('Find Profile Link for Anita', function(t) {
  var url = 'www.google.co.uk_search?q=Anita%20Czapla%20Founders';
  var file = require('path').resolve(__dirname + '/../data/' + url + '.html');
  var expected = 'https://uk.linkedin.com/in/anitaczapla';
  fs.readFile(file, function(err, html){
    // console.log(err);
    // console.log(html.toString());
    finder(url, html, function(err, data) {
      console.log(data)
      var links = data.links.filter(function(link){
        return link === expected;
      })
      t.ok(links[0] === expected, 'Found Profile Link for Anita: '+links[0]);
      t.end();
    });
  })
})
