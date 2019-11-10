const models = {
  sessions: require('../models/Session'),
  users: require('../models/User'),
};

module.exports = key => ({
  create: content => {
    return models[key].query().insert(content);
  },
  read: ({ page, pageSize, ...conditions }) => {
    return models[key]
      .query()
      .where({ isDeleted: false })
      .andWhere(conditions)
      .page(page, pageSize);
  },
  update: (...args) => {
    return models[key].query().patchAndFetchById(...args);
  },
  delete: id => {
    return models[key]
      .query()
      .patch({ is_deleted: true, deleted_at: new Date().toISOString() })
      .where({ id });
  },
});
