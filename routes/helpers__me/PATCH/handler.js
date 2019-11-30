const crud = require('../../../services/crud');

module.exports = table => request => {
  const values = request.payload;
  const conditions = {
    id: request.auth.credentials.helperId,
  };

  return crud(table).update(conditions, values);
};
