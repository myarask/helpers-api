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
      response.header('token', token);
      return response;
    },
  },
  {
    method: 'GET',
    path: '/shifts',
    config: { auth: 'jwt' },
    handler: (request, h) => {
      return [
        {
          id: 0,
          serviceId: 'service_3',
          clientId: 0,
          name: 'Mark Yaraskavitch',
          coordinates: '43.450276,-80.5029037',
          address: '100 Victoria St S, Room 123',
          city: 'Kitchener',
          province: 'Ontario',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      ];
    },
  },
];
