const User = require('../models/User');

module.exports = {
  create: payload => {
    return User.query().insert(payload);
  },
  read: () => {
    return User.query().select();
  },
};
