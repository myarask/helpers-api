const { method, path } = require('../../../utils/routes')(__filename);

module.exports = {
  method,
  path,
  handler: require('./handler'),
};
