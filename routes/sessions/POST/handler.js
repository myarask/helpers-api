const jwt = require('jsonwebtoken');

module.exports = services => request => {
  const { userId } = request.auth.credentials;

  const row = {
    userId,
    token: jwt.sign({ userId }, process.env.JWT_SECRET),
  };

  return services.sessions.create(row);
};
