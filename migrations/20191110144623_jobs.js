exports.up = knex => {
  return knex.schema.createTable('jobs', table => {
    table.increments().primary();
    table.timestamps();
    table.integer('requester_id').notNullable();
    table.integer('client_id').notNullable();
    table.integer('helper_id').notNullable();
    table.string('notes');

    table.foreign('requester_id').references('requesters.id');
    table.foreign('client_id').references('clients.id');
    table.foreign('helper_id').references('helpers.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('jobs');
};
