exports.up = knex => {
  return knex.schema.createTable('addresses', table => {
    table.increments().primary();
    table.timestamps();
    table.integer('user_id').notNullable();
    table.string('city').notNullable();
    table.string('country').notNullable();
    table.string('line1').notNullable();
    table.string('line2');
    table.string('postal_code');
    table.string('state').notNullable();

    table.foreign('user_id').references('users.id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('addresses');
};
