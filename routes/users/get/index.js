const services = {
  users: require('../../../models/User').query(),
};

module.exports = require('./route')(require('./handler')(services));
