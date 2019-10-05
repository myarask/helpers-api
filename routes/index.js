const jwt = require('jsonwebtoken');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: { auth: false },
    handler: () => 'Hello World',
  },
  {
    method: 'POST',
    path: '/sessions',
    config: { auth: 'simple' },
    handler: (request, h) => {
      const { id, ...body } = request.auth.credentials;
      const token = jwt.sign({ id }, process.env.JWT_SECRET);

      const response = h.response(body);
      response.header('Token', token);
      return response;
    },
  },
  {
    method: 'GET',
    path: '/restricted',
    config: { auth: 'jwt' },
    handler: (request, h) => {
      const response = h.response({ text: 'You used a Token!' });
      response.header('Authorization', request.headers.authorization);
      return response;
    },
  },
];
