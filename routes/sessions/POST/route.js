module.exports = handler => ({
  method: 'POST',
  path: '/sessions',
  config: { auth: 'simple' },
  handler,
});
