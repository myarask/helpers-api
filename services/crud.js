const models = {
  sessions: require('../models/Session'),
  users: require('../models/User'),
};

module.exports = key => ({
  create: content => {
    return models[key].query().insert(content);
  },
  read: options => {
    return models[key]
      .query()
      .select()
      .where({ isDeleted: false })
      .page(options.page, options.pageSize);
  },
  update: (...args) => {
    return models[key].query().patchAndFetchById(...args);
  },
  delete: id => {
    return models[key]
      .query()
      .patch({ isDeleted: true, deletedAt: new Date().toISOString() })
      .where({ id });
  },
});
