exports.up = knex => {
  return knex.schema.createTable('helpers', table => {
    table.increments().primary();
    table.timestamps();
    table.integer('user_id').notNullable();
    table.string('compensation').notNullable();
    table
      .boolean('is_helping')
      .notNullable()
      .defaultTo(false);

    table.unique(['user_id']);
    table.foreign('user_id').references('users.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('helpers');
};
