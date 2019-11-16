const User = require('../models').users;
const bcrypt = require('bcrypt');

module.exports = {
  validate: async (request, email, password) => {
    const user = await User.query()
      .where({ email })
      .first();

    if (!user) return { isValid: false };

    const isValid = bcrypt.compareSync(password, user.hash);

    return {
      isValid,
      credentials: {
        userId: user.id,
      },
    };
  },
};
