var files = null;

module.exports = function(requirejs) {
  'use strict';

  requirejs.define('node/load', ['fs'], function(fs) {
    function load(fileName) {
      var contents = fs.readFileSync(fileName, 'utf8');
      process.compile(contents, fileName);
    }

    return load;
  });
};

module.exports.bind = function (fileCache) {
  files = fileCache;
};
