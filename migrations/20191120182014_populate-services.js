exports.up = knex => {
  const created_at = new Date().toISOString();

  return knex('services').insert([
    {
      id: 1,
      created_at,
      name: 'Personal Care',
      description: 'Assistance with bathing, personal hygiene, toileting, or dressing',
      flat_fee: 37,
    },
    {
      id: 2,
      created_at,
      name: 'Mobility Assist',
      description: 'Lifting and transfers, including from sit to stand, wheelchair assistance',
      flat_fee: 30,
    },
    {
      id: 3,
      created_at,
      name: 'Medication Reminder',
      description: 'An in person reminder and assistance for scheduled medications',
      flat_fee: 20,
    },
    {
      id: 4,
      created_at,
      name: 'Driving Companion',
      description: 'Transportation with a companion for errands, shopping, or appointments',
      flat_fee: 35,
    },
  ]);
};

exports.down = async knex => {
  await knex('job_services').delete();
  return knex('services').delete();
};
