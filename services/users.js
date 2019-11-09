const User = require('../models/User');

// TODO: remove password from create and update response
const columns = ['id', 'createdAt', 'updatedAt', 'email'];

module.exports = {
  create: content => {
    return User.query().insert(content);
  },
  read: (page, pageSize) => {
    return User.query()
      .select(columns)
      .page(page, pageSize);
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
