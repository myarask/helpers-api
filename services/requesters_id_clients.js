const models = require('../models');

module.exports = {
  readById: id => {
    return models.requester_clients
      .query()
      .select(['requester_clients.client_id', 'users.email', 'users.first_name', 'users.last_name'])
      .where({ 'requester_clients.requesterId': id })
      .rightJoin('clients', { 'requester_clients.id': 'clients.id' })
      .join('users', { 'users.id': 'clients.user_id' });
  },
};
