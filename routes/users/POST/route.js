const Joi = require('@hapi/joi');

module.exports = handler => ({
  method: 'POST',
  path: '/users',
  handler,
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required(),
      }),
    },
  },
});
