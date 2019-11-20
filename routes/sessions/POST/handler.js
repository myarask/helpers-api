const jwt = require('jsonwebtoken');
const crud = require('../../../services/crud');

module.exports = table => request => {
  const { userId } = request.auth.credentials;

  const content = {
    userId,
    token: jwt.sign({ userId }, process.env.JWT_SECRET),
  };

  return crud(table).create(content);
};
