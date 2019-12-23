const Boom = require('@hapi/boom');

module.exports = request => {
  const conditions = request.query;
  const { helperId } = request.auth.credentials;

  if (helperId) {
    if (!conditions.statuses) {
      throw Boom.unauthorized('Helpers must specify a status');
    }
    const statuses = conditions.statuses.split(',');

    if (statuses.includes('draft')) {
      throw Boom.unauthorized('Helpers may not read jobs with status "draft"');
    } else if (statuses.includes('cancelled')) {
      throw Boom.unauthorized('Helpers may not read jobs with status "cancelled"');
    } else if (statuses.includes('reserved') && !conditions.helperId) {
      throw Boom.unauthorized('Helpers may not read jobs with status "reserved" without a helperId');
    } else if (conditions.helperId && conditions.helperId !== helperId) {
      throw Boom.unauthorized('Helpers may only specify their own helperId');
    }
  }
};
