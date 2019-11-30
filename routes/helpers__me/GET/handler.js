const crud = require('../../../services/crud');

module.exports = table => request => {
  const conditions = {
    id: request.auth.credentials.helperId,
  };

  return crud(table).readOne(conditions);
};
