const crud = require('../../../services/crud');
const Boom = require('@hapi/boom');

module.exports = table => async request => {
  const { userId } = request.auth.credentials;

  const addresses = await crud('addresses').readAll({ userId });

  if (!addresses.length) throw Boom.notFound('User is missing an address');
  if (addresses.length > 1) throw Boom.notFound('Cannot determine which address to use');
  const address = addresses[0];

  return crud(table).create({
    ...request.payload,
    city: address.city,
    country: address.country,
    line1: address.line1,
    line2: address.line2,
    postal_code: address.postal_code,
    state: address.state,
  });
};
