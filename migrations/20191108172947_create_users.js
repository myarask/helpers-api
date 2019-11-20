exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments().primary();
    table.timestamps();
    table.string('email').notNullable();
    table.string('hash').notNullable();
    table.string('first_name');
    table.string('last_name');

    table.unique(['email']);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};
