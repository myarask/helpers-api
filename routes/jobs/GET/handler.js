const validate = require('./validate');
const models = require('../../../models');

module.exports = table => async request => {
  validate(request);

  const { statuses, offset, limit, lng, lat, ...conditions } = request.query;

  if (lng !== undefined && lat !== undefined) {
  }

  const [data, count] = await Promise.all([
    models.jobs
      .query()
      .where(conditions)
      .whereIn('status', (statuses || '').split(','))
      .offset(offset)
      .limit(limit),
    models.jobs
      .query()
      .andWhere(conditions)
      .count('id')
      .first(),
  ]);
  return { data, length: parseInt(count.count) };
};
