exports.up = knex => {
  return knex.schema.createTable('requester_clients', table => {
    table.increments().primary();
    table.timestamps();
    table.integer('requester_id').notNullable();
    table.integer('client_id').notNullable();

    table.unique(['requester_id', 'client_id']);
    table.foreign('requester_id').references('requesters.id');
    table.foreign('client_id').references('clients.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('requester_clients');
};
