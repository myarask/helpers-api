const Joi = require('@hapi/joi');

module.exports = handler => ({
  method: 'DELETE',
  path: '/users/{id}',
  handler,
  options: {
    validate: {
      params: Joi.object({
        id: Joi.number()
          .integer()
          .positive()
          .required(),
      }),
    },
  },
});
