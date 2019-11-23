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
  readSingle: conditions =>
    models[key]
      .query()
      .where(conditions)
      .first(),
  update: (conditions, values) => {
    return models[key]
      .query()
      .where(conditions)
      .update(values);
  },
  delete: conditions => {
    return models[key]
      .query()
      .delete()
      .where(conditions);
  },
});
