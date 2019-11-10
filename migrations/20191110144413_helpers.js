exports.up = knex => {
  return knex.schema.createTable('helpers', table => {
    table.increments().primary();
    table.timestamps();
    table.timestamp('deleted_at');
    table
      .boolean('is_deleted')
      .notNullable()
      .default(false);
    table.integer('user_id').notNullable();

    table.unique(['user_id']);
    table.foreign('user_id').references('users.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('helpers');
};
