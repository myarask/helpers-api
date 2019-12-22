const crud = require('../../../services/crud');

module.exports = table => request => {
  const { userId } = request.credentials;

  const content = {
    userId,
    ...request.payload,
  };

  return crud(table).create(content);
};
