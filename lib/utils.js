var path = require('path');

var frontSlashRegexp = /\\/g;

function frontSlash(fileName) {
  return fileName.replace(frontSlashRegexp, '/');
}

function normalize(fileName) {
  return frontSlash(path.normalize(fileName));
}

module.exports = {
  frontSlash: frontSlash,
  normalize: normalize
};
