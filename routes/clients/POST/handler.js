const crud = require('../../../services/crud');

module.exports = table => request => {
  return crud(table).create(request.payload);
};
