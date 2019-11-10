// const models = {
//   sessions: require('../models/Session'),
//   users: require('../models/User'),
// };

const models = require('../models');

module.exports = key => ({
  create: content => {
    return models[key].query().insert(content);
  },
  read: async ({ limit, offset, ...conditions }) => {
    const [data, count] = await Promise.all([
      models[key]
        .query()
        .where({ isDeleted: false })
        .andWhere(conditions)
        .offset(offset)
        .limit(limit),
      models[key]
        .query()
        .where({ isDeleted: false })
        .andWhere(conditions)
        .count('id')
        .first(),
    ]);
    return { data, length: parseInt(count.count) };
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
