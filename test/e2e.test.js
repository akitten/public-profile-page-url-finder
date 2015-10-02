var test = require('tape');
var LF   = require('../lib/index');

test('Attempt to search with wrong keywords', function(t) {

  LF(null, function(err, data){
    t.ok(err === 404, 'Don\'t do that  ...')
    t.end();
  });
})

test('Force profile link for Anita', function(t){
	var keywords = ['Anita', 'Czapla','Founders'];
  var expected = 'https://uk.linkedin.com/in/anitaczapla';

	LF(keywords, function(err, data){
    console.log(data)
    var links = data.links.filter(function(link){
      return link === expected;
    })
    t.ok(links[0] === expected, 'Found Profile Link for Anita: '+links[0]);
		t.end();
	});

})
