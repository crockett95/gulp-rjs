var gutil = require('gulp-util');

module.exports = function(requirejs) {
  'use strict';

  requirejs.define('node/print', function() {
    function print(msg) {
      gutil.log(msg);
    }

    return print;
  });
};
