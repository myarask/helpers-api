exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments().primary();
    table.timestamps();
    table.string('email').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};