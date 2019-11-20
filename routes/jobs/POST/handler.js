const crud = require('../../../services/crud');

module.exports = table => async request => {
  return crud(table).create(request.payload);
};
