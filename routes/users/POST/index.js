module.exports = routes => {
  const i = routes.findIndex(route => route.method === 'POST' && route.path === '/users');

  routes[i].handler = require('./handler');
};
