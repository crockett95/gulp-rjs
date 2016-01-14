var gulp = require('gulp');
var rjs = require('./index');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');

gulp.task('try', function() {
  switch (gutil.env.suite) {
    case 'ts':
    case 'typescript':
      tryTypescript();
      break;
    case 'js':
    case 'javascript':
    default:
      tryJavascript();
      break;
  }
});

function tryTypescript() {
  gulp.src('./test/fixtures/typescript/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript({
      "module": "amd",
      "noImplicitAny": true,
      "removeComments": true,
      "preserveConstEnums": true,
      "sourceMap": true,
      "target": "es5",
      "declaration": true,
      "inlineSourceMap": true
    }))
    .pipe(rjs({
      baseUrl: 'test/fixtures/typescript',
      out: 'main.min.js',
      name: 'main',
      preserveLicenseComments: false,
      optimize: 'uglify2',
      generateSourceMaps: true,
      uglify2: {
        output: {
          beautify: true
        }
      }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./.tmp'));
}

function tryJavascript() {
  return gulp.src('./test/fixtures/javascript/*.js')
    .pipe(sourcemaps.init())
    .pipe(rjs({
      baseUrl: 'test/fixtures/javascript',
      out: 'main.min.js',
      name: 'main',
      preserveLicenseComments: false,
      optimize: 'uglify2',
      generateSourceMaps: true,
      uglify2: {
        output: {
          beautify: true
        }
      }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./.tmp'));
}
