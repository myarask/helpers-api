const services = {
  users: require('../../../services/crud')('users'),
};

module.exports = require('./route')(require('./handler')(services));
