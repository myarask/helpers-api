const Knex = require('knex');
const { Model, knexSnakeCaseMappers } = require('objection');

const knex = Knex({
  // ...require('../knexfile')[process.env.ENVIRONMENT || 'development'],
  ...require('../knexfile')['development'],
  ...knexSnakeCaseMappers(),
});

Model.knex(knex);

class BaseModel extends Model {
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = BaseModel;
