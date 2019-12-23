exports.up = knex => {
  return knex.schema.createTable('jobs', table => {
    table.increments().primary();
    table.timestamps();
    table.integer('requester_id').notNullable();
    table.integer('client_id').notNullable();
    table.integer('helper_id');
    table.string('status').notNullable();
    table.string('notes');
    table.string('city').notNullable();
    table.string('country').notNullable();
    table.string('line1').notNullable();
    table.string('line2');
    table.string('postal_code');
    table.string('state').notNullable();
    table.float('lat', 14, 10).notNullable();
    table.float('lng', 14, 10).notNullable();

    table.foreign('requester_id').references('requesters.id');
    table.foreign('client_id').references('clients.id');
    table.foreign('helper_id').references('helpers.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('jobs');
};
