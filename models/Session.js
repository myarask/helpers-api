const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Session extends Model {
  static get tableName() {
    return 'sessions';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'sessions.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Session;
