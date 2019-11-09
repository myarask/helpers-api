const Session = require('../models/Session');

module.exports = {
  create: payload => {
    return Session.query().insert(payload);
  },
  read: options => {
    return Session.query()
      .select()
      .page(options.page, options.pageSize);
  },
  update: (...args) => {
    return Session.query().patchAndFetchById(...args);
  },
  delete: id => {
    return Session.query()
      .where({ id })
      .del();
  },
};
