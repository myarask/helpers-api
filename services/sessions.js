const Session = require('../models/Session');

module.exports = {
  create: content => {
    return Session.query().insert(content);
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
