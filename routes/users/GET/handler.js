const crud = require('../../../services/crud');

module.exports = request => {
  return crud('users').read(request.query);
};
