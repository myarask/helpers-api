const service = require('../../../services/requesters_id_clients');

module.exports = request => {
  return service.readById(request.params.id).catch(e => console.log(e));
};
