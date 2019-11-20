const Path = require('path');

module.exports = filename => {
  const folders = Path.dirname(filename).split(Path.sep);
  const method = folders.pop().toUpperCase();
  const table = folders.pop();
  const path = ('/' + table).replace('__id__', '/{id}/').replace('__id', '/{id}');

  return {
    method,
    path,
    table,
  };
};
