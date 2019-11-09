const services = {
  sessions: require('../../../services/sessions'),
};

module.exports = require('./route')(require('./handler')(services));
