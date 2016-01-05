var test    = require('tape');
var fs      = require('fs');
var dir     = __dirname.split('/')[__dirname.split('/').length-1];
var file    = dir + __filename.replace(__dirname, '') + ' >';
var LF      = require('../lib/index');
var finder  = require('../lib/finder');

test(file+' Find Profile Link for Anita', function(t) {
  var url = 'www.google.co.uk_search?q=Anita%20Czapla%20Founders';
  var file = require('path').resolve(__dirname + '/../data/' + url + '.html');
  var expected = 'https://www.linkedin.com/in/anitaczapla';
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

test(file+' Find Profile Link for Abdi', function(t) {
  var url = 'www.google.co.uk_search?q=Abdi%20Ahmed%20Founders';
  var file = require('path').resolve(__dirname + '/../data/' + url + '.html');
  var expected = 'https://www.linkedin.com/in/abdi-ahmed-6b0384100';
  fs.readFile(file, function(err, html){
    // console.log(err);
    // console.log(html.toString());
    finder(url, html, function(err, data) {
      console.log(data)
      var links = data.links.filter(function(link){
        return link === expected;
      })
      t.ok(links[0] === expected, 'Found Profile Link for Abdi: '+links[0]);
      t.end();
    });
  })
})


test(file+' Find Profile Link for Simon', function(t) {
  var url = 'www.google.co.uk_search?q=Simon%20Labondance%20Founders';
  var file = require('path').resolve(__dirname + '/../data/' + url + '.html');
  // var expected = 'https://uk.linkedin.com/in/simonlab';
  var expected = 'https://uk.linkedin.com/in/anitaczapla';
  fs.readFile(file, function(err, html){
    console.log(err);
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

test(file+' Find Profile Link for Jan', function(t) {
  var url = 'www.google.co.uk_search?q=Jan%20Binder%20';
  var file = require('path').resolve(__dirname + '/../data/' + url + '.html');
  // var expected = 'https://uk.linkedin.com/in/simonlab';
  var expected = 'https://uk.linkedin.com/in/janbinder';
  fs.readFile(file, function(err, html){
    console.log(err);
    // console.log(html.toString());
    finder(url, html, function(err, data) {
      console.log(data)
      var links = data.links.filter(function(link){
        return link === expected;
      })
      t.ok(links.length === 0 , 'No profile link found for Jan: '+ links[0]);
      t.end();
    });
  })
})

