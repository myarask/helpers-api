exports.up = knex => {
  return knex.schema.createTable('job_services', table => {
    table.increments().primary();
    table.timestamps();
    table.integer('job_id').notNullable();
    table.integer('service_id').notNullable();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.decimal('flat_fee', 14, 2);

    table.unique(['job_id', 'service_id']);
    table.foreign('job_id').references('jobs.id');
    table.foreign('service_id').references('services.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('job_services');
};
