module.exports = routes => {
  const i = routes.findIndex(route => route.method === 'POST' && route.path === '/sessions');

  routes[i].config = { auth: 'simple' };
  routes[i].handler = require('./handler');
};
