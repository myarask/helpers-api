const config = {
  port: process.env.PORT || 5000,
  routes: {
    cors: {
      origin: ['*'], // an array of origins or 'ignore'
      headers: ['*'], // an array of strings - 'Access-Control-Allow-Headers'
      exposedHeaders: ['*'], // an array of exposed headers - 'Access-Control-Expose-Headers',
      additionalExposedHeaders: ['*'], // an array of additional exposed headers
      maxAge: 60,
      credentials: true, // boolean - 'Access-Control-Allow-Credentials'
    },
  },
};

if (process.env.NODE_ENV !== 'production') {
  config.host = 'localhost';
}

module.exports = config;
