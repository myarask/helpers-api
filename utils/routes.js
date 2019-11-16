const path = require('path');

module.exports = filename => {
  const folders = path.dirname(filename).split(path.sep);
  const method = folders.pop().toUpperCase();

  return {
    method,
    path: '/' + folders.pop(),
  };
};
