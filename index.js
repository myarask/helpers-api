require('dotenv').config();
const Hapi = require('@hapi/hapi');

const init = async () => {
  const config = require('./config');
  const server = Hapi.server(config);

  await server.register([require('hapi-auth-jwt2'), require('@hapi/basic')]);

  const basic = require('./auth/basic');
  const jwt = require('./auth/basic');
  server.auth.strategy('simple', 'basic', basic);
  server.auth.strategy('jwt', 'jwt', jwt);
  // server.auth.default('jwt');

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
