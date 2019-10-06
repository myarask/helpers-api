const config = {
  port: process.env.PORT || 5000,
  routes: {
    cors: true,
  },
};

if (process.env.NODE_ENV !== 'production') {
  config.host = 'localhost';
}

module.exports = config;
