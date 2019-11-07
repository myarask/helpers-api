const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      sessions: {
        relation: Model.HasManyRelation,
        modelClass: require('./Session'),
        join: {
          from: 'users.id',
          to: 'sessions.user_id',
        },
      },
    };
  }
}

module.exports = User;
