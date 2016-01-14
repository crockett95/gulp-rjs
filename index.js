'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var defaults = require('lodash.defaults');
var applyMaps = require('vinyl-sourcemaps-apply');
var requirejs = require('requirejs');

var FileCache = require('./lib/file-cache');

var argsOverride = require('./lib/overrides/args');
var assertOverride = require('./lib/overrides/assert');
var fileOverride = require('./lib/overrides/file');
var loadOverride = require('./lib/overrides/load');
var printOverride = require('./lib/overrides/print');
var quitOverride = require('./lib/overrides/quit');

requirejs({ context: 'build' });
argsOverride(requirejs);
assertOverride(requirejs);
fileOverride(requirejs);
loadOverride(requirejs);
printOverride(requirejs);
quitOverride(requirejs);

module.exports = function(options) {
  'use strict';

  var files = new FileCache();
  var sourceMapText = false;

  options = defaults(options || {}, {});

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb();
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-rjs', 'Streaming not supported'));
      return;
    }

    files.add(file, enc);
    cb();
  }, function (cb) {
    var outFile = options.out;
    var _this = this;

    fileOverride.bind(files);
    loadOverride.bind(files);

    options.out = function out(text, sourceMapText) {
      var file = new gutil.File({
        path: outFile,
        contents: new Buffer(text.replace(/\n\s*\/\/#\s*sourceMappingURL.*$/g, ''))
      });

      if (sourceMapText) {
        applyMaps(file, sourceMapText);
      }
      _this.push(file);
      cb();
    };

    try {
      requirejs.optimize(options, null, function(err) {
        _this.emit('error', new gutil.PluginError('gulp-rjs', err));
      });
    } catch (err) {
      this.emit('error', new gutil.Error('gulp-rjs', err));
    }
  });
};
