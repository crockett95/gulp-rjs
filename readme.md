# gulp-rjs [![Build Status](https://travis-ci.org/crockett95/gulp-rjs.svg?branch=master)](https://travis-ci.org/crockett95/gulp-rjs)

> My unreal gulp plugin


## Install

```
$ npm install --save-dev gulp-rjs
```


## Usage

```js
var gulp = require('gulp');
var rjs = require('gulp-rjs');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(rjs())
		.pipe(gulp.dest('dist'));
});
```


## API

### rjs(options)

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [Stephen Crockett](https://github.com/crockett95)
