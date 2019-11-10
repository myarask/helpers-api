const User = require('../models').users;

module.exports = {
  validate: (request, email, password) => {
    return User.query()
      .select('id')
      .where({ email, password })
      .first()
      .then(result => ({
        isValid: true,
        credentials: {
          userId: result.id,
        },
      }))
      .catch(() => ({ isValid: false }));
  },
};
