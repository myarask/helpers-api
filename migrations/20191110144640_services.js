exports.up = knex => {
  return knex.schema.createTable('services', table => {
    table.increments().primary();
    table.timestamps();
    table.timestamp('deleted_at');
    table
      .boolean('is_deleted')
      .notNullable()
      .default(false);

    table.string('name').notNullable();
    table.string('description').notNullable();
    table.decimal('flat_fee', 14, 2);
    table.unique(['name']);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('services');
};
