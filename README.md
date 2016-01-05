# public-profile-page-link-finder

[![Build Status](https://travis-ci.org/akitten/public-profile-page-url-finder.svg)](https://travis-ci.org/akitten/public-profile-page-url-finder)
[![codecov.io](http://codecov.io/github/akitten/public-profile-page-url-finder/coverage.svg?branch=master)](http://codecov.io/github/akitten/public-profile-page-url-finder?branch=master)
[![bitHound Score](https://www.bithound.io/github/akitten/public-profile-page-url-finder/badges/score.svg)](https://www.bithound.io/github/akitten/public-profile-page-url-finder)
[![Dependency Status](https://david-dm.org/akitten/public-profile-page-url-finder.svg)](https://david-dm.org/akitten/public-profile-page-url-finder)
[![devDependency Status](https://david-dm.org/akitten/public-profile-page-url-finder/dev-status.svg)](https://david-dm.org/akitten/public-profile-page-url-finder#info=devDependencies)
[![HitCount](https://hitt.herokuapp.com/akitten/public-profile-page-url-finder.svg)](https://github.com/akitten/public-profile-page-url-finder)


## Why?

Given a person's name, surname and any other `[keywords]`,  
We need to find a LinkedIn Public Profile Page Link.

## What?

Does *exactly* what we need it to.

## How?

### Basic usage

Install the `public-profile-page-link-finder` package from NPM:

```sh
npm install public-profile-page-link-finder --save
```

Then in your code:

```js
var LF = require('public-profile-page-link-finder');
var keywords = ['Anita', 'Czapla','Founders'];
LF(keywords, function(err, data){
  console.log(JSON.stringify(data, null, 2)); // see below for sample
})
```

Sample result:

```js
{ url: 'www.google.co.uk_search?q=Anita%20Czapla%20Founders',
  links:
   [ 'https://uk.linkedin.com/in/anitaczapla',
     'https://www.linkedin.com/pub/dir/Anita',
     'https://uk.linkedin.com/in/annivaananen',
     'https://www.linkedin.com/pub/lukas-siebeck/5a/87a/853?trk=pub...' ] }
```

Use the `data.links` how ever you choose.

## Any questions?

Submit an issue: https://github.com/akitten/public-profile-page-url-finder/issues
