const crud = require('../../../services/crud');

module.exports = async request => {
  const job = await crud('jobs').readOne(request.params);

  const [services, client] = await Promise.all([
    crud('job_services').readAll({ jobId: job.id }),
    crud('clients')
      .readOne({ id: job.clientId })
      .then(client => client.userId)
      .then(userId => crud('users').readOne({ id: userId })),
  ]);

  return {
    client: {
      id: client.id,
      email: client.email,
      firstName: client.firstName,
      lastName: client.lastName,
    },
    services,
    status: job.status,
    notes: job.notes,
  };
};
