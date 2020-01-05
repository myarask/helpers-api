const models = require('../models');

module.exports = {
  readById: id => {
    return models.requester_clients
      .query()
      .select(['requester_clients.clientId', 'users.email', 'users.firstName', 'users.lastName'])
      .where({ 'requester_clients.requesterId': id })
      .rightJoin('clients', { 'requester_clients.clientId': 'clients.id' })
      .join('users', { 'users.id': 'clients.userId' });
  },
};
