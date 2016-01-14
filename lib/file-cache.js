var utils = require('./utils');

function FileCache() {
  this._files = new Map();
}

FileCache.prototype.add = function(file, enc) {
  this._files.set(utils.normalize(file.path), { file: file, enc: enc });

  return this;
};

FileCache.prototype.get = function(fileName) {
  return this._files.get(utils.normalize(fileName));
};

FileCache.prototype.getContents = function(fileName) {
  return this.has(fileName) && this.get(fileName).file.contents.toString();
};

FileCache.prototype.getEncoding = function(fileName) {
  return this.has(fileName) && this.get(fileName).enc;
};

FileCache.prototype.has = function(fileName) {
  return this._files.has(utils.normalize(fileName));
};

FileCache.prototype.clear = function() {
  this._files.clear();
};

FileCache.prototype.delete = function(fileName) {
  return this._files.delete(utils.normalize(fileName));
};

module.exports = FileCache;
