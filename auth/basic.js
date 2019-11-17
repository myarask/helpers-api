const User = require('../models').users;
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

module.exports = {
  validate: async (request, email, password) => {
    const user = await User.query()
      .where({ email })
      .first();

    if (!user) throw Boom.notFound('Email not found');

    const isValid = bcrypt.compareSync(password, user.hash);

    return {
      isValid,
      credentials: {
        userId: user.id,
      },
    };
  },
};
