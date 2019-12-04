const crud = require('../../../services/crud');

module.exports = table => request => {
  const values = request.payload;
  const conditions = request.params;

  return crud(table).update(conditions, values);
};
