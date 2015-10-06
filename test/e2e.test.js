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

test('Check that any-na linkedIn links are not selected', function(t) {
  var keywords =  [ 'Mihail', 'Maxacov','YOPESO','Senior','JavaScript','developer' ];
  var notExpected = 'https://any-na.www.linkedin.com/pub/mihai-iachimovschi/89/134/401';

  LF(keywords, function(err, data){
    console.log(data)

    t.ok(data.links.indexOf(notExpected) === -1, 'Filter Profile Link starting with any-na');
      t.end();
  });
})

test('Check that the link of a pdf are correctly parsed', function(t) {
  var keywords =  [ 'Abdi', 'Ahmed', 'Founders', 'and', 'Coders'];

  LF(keywords, function(err, data){
    console.log(data)

    t.ok(data.links.length > 0, 'Find links for Abdi');
      t.end();
  });
})
