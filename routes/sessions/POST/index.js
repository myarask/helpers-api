const services = {
  sessions: require('../../../services/crud')('sessions'),
};

module.exports = require('./route')(require('./handler')(services));
