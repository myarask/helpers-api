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
    models.requesters
      .query()
      .select('id')
      .where({ userId }),
    models.clients
      .query()
      .select('id')
      .where({ userId }),
    models.helpers
      .query()
      .select('id')
      .where({ userId }),
    models.admins
      .query()
      .select('id')
      .where({ userId }),
  ]);

  return {
    ...session,
    requesterId: ids[0].length ? ids[0][0].id : undefined,
    clientId: ids[1].length ? ids[1][0].id : undefined,
    helperId: ids[2].length ? ids[2][0].id : undefined,
    adminId: ids[3].length ? ids[3][0].id : undefined,
  };
};
