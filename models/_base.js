const { Model, snakeCaseMappers } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class BaseModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = BaseModel;
