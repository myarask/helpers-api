exports.up = knex => {
  return knex.schema.createTable('jobs', table => {
    table.increments().primary();
    table.timestamps();
    table.timestamp('deleted_at');
    table
      .boolean('is_deleted')
      .notNullable()
      .default(false);
    table.integer('requester_id').notNullable();
    table.integer('client_id').notNullable();
    table.integer('helper_id').notNullable();
    table.string('special_requests');

    table.foreign('requester_id').references('requesters.id');
    table.foreign('client_id').references('clients.id');
    table.foreign('helper_id').references('helpers.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('jobs');
};
