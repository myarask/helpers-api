const Boom = require('@hapi/boom');

module.exports = request => {
  const conditions = request.query;
  const { helperId } = request.auth.credentials;

  if (helperId) {
    if (!conditions.status) {
      throw Boom.unauthorized('Helpers must specify a status');
    } else if (conditions.status === 'draft') {
      throw Boom.unauthorized('Helpers may not read jobs with status "draft"');
    } else if (conditions.status === 'cancelled') {
      throw Boom.unauthorized('Helpers may not read jobs with status "cancelled"');
    } else if (conditions.status === 'reserved' && !conditions.helperId) {
      throw Boom.unauthorized('Helpers may not read jobs with status "reserved" without a helperId');
    } else if (conditions.helperId && conditions.helperId !== helperId) {
      throw Boom.unauthorized('Helpers may only specify their own helperId');
    }
  }
};
