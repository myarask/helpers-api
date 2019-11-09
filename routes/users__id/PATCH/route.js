const Joi = require('@hapi/joi');

module.exports = handler => ({
  method: 'PATCH',
  path: '/users/{id}',
  handler,
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string().email(),
        password: Joi.string(),
      }),
    },
  },
});
