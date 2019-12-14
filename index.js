require('dotenv').config();
const Hapi = require('@hapi/hapi');

const init = async () => {
  const config = require('./config');
  const server = Hapi.server(config);

  await server.register([require('hapi-auth-jwt2'), require('@hapi/basic')]);

  server.auth.strategy('simple', 'basic', require('./auth/basic'));
  server.auth.strategy('jwt', 'jwt', require('./auth/jwt'));
  server.auth.strategy('jwt-client', 'jwt', require('./auth/jwt-client'));
  server.auth.strategy('jwt-helper', 'jwt', require('./auth/jwt-helper'));
  server.auth.strategy('jwt-requester', 'jwt', require('./auth/jwt-requester'));
  // server.auth.default('jwt');

  const routes = require('./routes');
  server.route(routes);

  server.log();

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
