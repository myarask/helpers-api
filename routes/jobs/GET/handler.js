const crud = require('../../../services/crud');
const validate = require('./validate');

module.exports = table => request => {
  validate(request);

  const conditions = request.query;

  return crud(table).read(conditions);
};
