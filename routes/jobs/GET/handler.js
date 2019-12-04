const crud = require('../../../services/crud');
const validate = require('./validate');

module.exports = table => async request => {
  const conditions = request.query;

  validate(request.auth.credentials, conditions);

  return crud(table).read(conditions);
};
