const jwt = require('jsonwebtoken');
const crud = require('../../../services/crud');
const models = require('../../../models');

module.exports = table => async request => {
  const { userId } = request.auth.credentials;

  const content = {
    userId,
    token: jwt.sign({ userId }, process.env.JWT_SECRET),
  };

  const session = await crud(table).create(content);

  const ids = await Promise.all([
    models.users
      .query()
      .select('email', 'firstName', 'lastName')
      .where({ id: userId })
      .first(),
    models.requesters
      .query()
      .select('id')
      .where({ userId })
      .first(),
    models.clients
      .query()
      .select('id')
      .where({ userId })
      .first(),
    models.helpers
      .query()
      .select('id')
      .where({ userId })
      .first(),
    models.admins
      .query()
      .select('id')
      .where({ userId })
      .first(),
  ]);

  return {
    ...session,
    ...ids[0],
    requesterId: ids[1] ? ids[1].id : null,
    clientId: ids[2] ? ids[2].id : null,
    helperId: ids[3] ? ids[3].id : null,
    adminId: ids[4] ? ids[4].id : null,
  };
};
