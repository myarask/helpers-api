const crud = require('../../../services/crud');

module.exports = request => {
  return crud('users').delete(request.query);
};
