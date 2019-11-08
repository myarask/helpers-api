const User = require('../models/User');

// TODO: remove password from create and update response
const columns = ['id', 'createdAt', 'updatedAt', 'email'];

module.exports = {
  create: payload => {
    return User.query().insert(payload);
  },
  read: () => {
    return User.query().select(columns);
  },
  update: (...args) => {
    return User.query().patchAndFetchById(...args);
  },
  delete: id => {
    return User.query()
      .where({ id })
      .del();
  },
};
