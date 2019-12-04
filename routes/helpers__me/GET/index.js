const { method, path, table } = require('../../../utils/routes')(__filename);

module.exports = {
  method,
  path,
  handler: require('./handler')(table),
  options: {
    auth: 'jwt-helper',
  },
};