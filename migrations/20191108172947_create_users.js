exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments().primary();
    table.timestamps();
    table.timestamp('deleted_at');
    table
      .boolean('is_deleted')
      .notNullable()
      .default(false);
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.unique(['email']);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};
