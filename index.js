require('dotenv').config();
const Hapi = require('@hapi/hapi');

const init = async () => {
  const config = require('./config');
  const server = Hapi.server(config);

  await server.register([require('hapi-auth-jwt2'), require('@hapi/basic')]);

  server.auth.strategy('simple', 'basic', {
    validate: async (request, username, password) => {
      if (username === 'helper@helpers.ca' && password === 'helper@helpers.ca') {
        return {
          isValid: true,
          credentials: {
            id: 1,
            isHelper: true,
            isClient: false,
            isRequester: false,
          },
        };
      }

      if (username === 'client@helpers.ca' && password === 'client@helpers.ca') {
        return {
          isValid: true,
          credentials: {
            id: 2,
            isHelper: false,
            isClient: true,
            isRequester: false,
          },
        };
      }

      if (username === 'requester@helpers.ca' && password === 'requester@helpers.ca') {
        return {
          isValid: true,
          credentials: {
            id: 3,
            isHelper: false,
            isClient: false,
            isRequester: true,
          },
        };
      }

      return { isValid: false };
    },
  });

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate: async (decoded, request, h) => {
      if ([1, 2, 3].includes(decoded.id)) {
        return { isValid: true };
      }

      return { isValid: false };
    },
  });

  server.auth.default('jwt');

  const routes = require('./routes');
  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
