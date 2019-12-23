const jwt = require('jsonwebtoken');
const crud = require('../../../services/crud');
const models = require('../../../models');

const fetchId = (key, conditions) =>
  models[key]
    .query()
    .select('id')
    .where(conditions)
    .first()
    .then(({ id }) => id)
    .catch(() => null);

module.exports = table => async request => {
  const { userId } = request.auth.credentials;

  const [user, requesterId, clientId, helper, adminId] = await Promise.all([
    models.users
      .query()
      .select('email', 'firstName', 'lastName')
      .where({ id: userId })
      .first(),
    fetchId('requesters', { userId }),
    fetchId('clients', { userId }),
    models.helpers
      .query()
      .select('id as helperId', 'isHelping')
      .where({ userId })
      .first()
      .then(resp => resp || { helperId: null }),
    fetchId('admins', { userId }),
  ]);

  const { helperId } = helper;

  // const activeJobId = helperId ? await fetchId('jobs', { helperId, status: 'reserved' }) : undefined;
  const activeJobId = helperId
    ? await models.jobs
        .query()
        .select('id')
        .where({ helperId })
        .whereIn('status', ['reserved', 'in_progress', 'reviewing'])
        .first()
        .then(({ id }) => id)
        .catch(() => null)
    : undefined;

  const tokenContent = {
    userId,
    requesterId,
    clientId,
    helperId: helperId,
    adminId,
  };

  const content = {
    userId,
    token: jwt.sign(tokenContent, process.env.JWT_SECRET),
  };

  const session = await crud(table).create(content);

  return {
    ...user,
    ...helper,
    ...tokenContent,
    ...session,
    activeJobId,
  };
};
