exports.up = knex => {
  return knex.schema.createTable('requesters', table => {
    table.increments().primary();
    table.timestamps();
    table.integer('user_id').notNullable();
    table.string('customer_id').notNullable();

    table.unique(['customer_id']);
    table.foreign('user_id').references('users.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('requesters');
};
