var test = require('tape');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file  = dir + __filename.replace(__dirname, '') + ' >';
var LF   = require('../lib/index');

test(file+' Attempt to search with wrong keywords', function(t) {

  LF(null, function(err, data){
    t.ok(err === 404, 'Don\'t do that  ...')
    t.end();
  });
})

test(file+' Force profile link for Anita', function(t){
	var keywords = ['Anita', 'Czapla','Founders'];
  var expected = 'https://www.linkedin.com/in/anitaczapla';

	LF(keywords, function(err, data){
    console.log(data)
    var links = data.links.filter(function(link){
    return link === expected;
    });
    t.ok(links[0] === expected, 'Found Profile Link for Anita: '+links[0]);
		t.end();
	});
})

test(file+' Check that any-na linkedIn links are not selected', function(t) {
  var keywords =  [ 'Mihail', 'Maxacov','YOPESO','Senior','JavaScript','developer' ];
  var notExpected = 'https://any-na.www.linkedin.com/pub/mihai-iachimovschi/89/134/401';

  LF(keywords, function(err, data){
    console.log(data)

    t.ok(data.links.indexOf(notExpected) === -1, 'Filter Profile Link starting with any-na');
      t.end();
  });
})

test(file+' Check that the link of a pdf are correctly parsed', function(t) {
  var keywords =  [ 'Ines', 'Teles', 'Founders', 'Coders', 'pdf'];

  LF(keywords, function(err, data){
    console.log(data)

    t.ok(data.links.length > 0, 'Find links for Ines');
      t.end();
  });
})

test(file+' Check that the link of a image are avoid', function(t) {
  var keywords =  [ 'Alex', 'Bubb', 'Microsoft'];

  LF(keywords, function(err, data){
    console.log(data)

    t.ok(data.links.length > 0, 'Find links for Alex');
      t.end();
  });
})

test(file+' Check that the link of a image are avoid for BEN', function(t) {
  var keywords =  [ 'Ben', 'Howes', 'Supercell'];

  LF(keywords, function(err, data){
    console.log(data)

    t.ok(data.links.length > 0, 'Find links for Ben');
      t.end();
  });
})

// test(file+' Check that the link of a image are avoid for Jan ', function(t) {
//   var keywords =  [ 'Jan', 'Binder', ''];

//   LF(keywords, function(err, data){
//     console.log(data)

//     t.ok(data.links.length === 0, 'No links found for Jan');
//       t.end();
//   });
// })
