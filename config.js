const config = {
  port: process.env.PORT || 5000,
  routes: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with'],
      additionalExposedHeaders: ['Token'],
    },
  },
};

if (process.env.NODE_ENV !== 'production') {
  config.host = 'localhost';
}

module.exports = config;
