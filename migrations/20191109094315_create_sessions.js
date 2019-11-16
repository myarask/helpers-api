exports.up = knex => {
  return knex.schema.createTable('sessions', table => {
    table.increments().primary();
    table.timestamps();
    table.integer('user_id').notNullable();
    table.string('token').notNullable();

    table.unique(['token']);
    table.foreign('user_id').references('users.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('sessions');
};
