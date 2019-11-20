const crud = require('../../../services/crud');

module.exports = request => {
  return crud('requesters').read(request.query);
};
