const jwt = require('jsonwebtoken');
const crud = require('../../../services/crud');
const models = require('../../../models');

const fetchId = (key, userId) =>
  models[key]
    .query()
    .select('id')
    .where({ userId })
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
    fetchId('requesters', userId),
    fetchId('clients', userId),
    models.helpers
      .query()
      .select('id as helperId', 'isHelping')
      .where({ userId })
      .first()
      .catch(() => ({ helperId: null })),
    fetchId('admins', userId),
  ]);

  const tokenContent = {
    userId,
    requesterId,
    clientId,
    helperId: helper.helperId,
    adminId,
  };

  const content = {
    userId,
    token: jwt.sign(tokenContent, process.env.JWT_SECRET),
  };

  const session = await crud(table).create(content);

  return {
    ...session,
    ...user,
    ...helper,
    ...tokenContent,
  };
};
