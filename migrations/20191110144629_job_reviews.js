exports.up = knex => {
  return knex.schema.createTable('job_reviews', table => {
    table.increments().primary();
    table.timestamps();
    table.integer('job_id').notNullable();
    table.integer('user_id').notNullable();

    table.integer('star_rating');
    table.string('comment');

    table.unique(['job_id', 'user_id']);
    table.foreign('job_id').references('jobs.id');
    table.foreign('user_id').references('users.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('job_reviews');
};
