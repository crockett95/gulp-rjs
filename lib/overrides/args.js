module.exports = function(requirejs) {
  'use strict';

  requirejs.define('node/args', function() {
    //Do not return the "node" or "r.js" arguments
    var args = process.argv.slice(2);

    //Ignore any command option used for main x.js branching
    if (args[0] && args[0].indexOf('-') === 0) {
      args = args.slice(1);
    }

    return args;
  });
};
