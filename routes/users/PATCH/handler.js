const crud = require('../../../services/crud');

module.exports = request => {
  const values = request.payload;
  const conditions = request.query;

  return crud('users').update(conditions, values);
};
