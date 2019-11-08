const services = {
  users: require('../../../services/users'),
};

module.exports = require('./route')(require('./handler')(services));
