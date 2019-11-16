const models = require('../models');

module.exports = key => ({
  create: content => {
    return models[key].query().insert(content);
  },
  read: async ({ limit, offset, ...conditions }) => {
    const [data, count] = await Promise.all([
      models[key]
        .query()
        .andWhere(conditions)
        .offset(offset)
        .limit(limit),
      models[key]
        .query()
        .andWhere(conditions)
        .count('id')
        .first(),
    ]);
    return { data, length: parseInt(count.count) };
  },
  update: (...args) => {
    return models[key].query().patchAndFetchById(...args);
  },
  delete: conditions => {
    return models[key]
      .query()
      .delete()
      .where(conditions);
  },
});
