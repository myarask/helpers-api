const { knexSnakeCaseMappers } = require('objection');
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PSQL_HOST,
      database: process.env.PSQL_DATABASE,
      user: process.env.PSQL_USERNAME,
      password: process.env.PSQL_PASSWORD,
      ssl: true,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    // client: 'postgresql',
    // connection: {
    //   database: 'my_db',
    //   user:     'username',
    //   password: 'password'
    // },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  },

  production: {
    // client: 'postgresql',
    // connection: {
    //   database: 'my_db',
    //   user:     'username',
    //   password: 'password'
    // },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  },
  ...knexSnakeCaseMappers(),
};
