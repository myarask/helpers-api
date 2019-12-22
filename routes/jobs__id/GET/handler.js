const crud = require('../../../services/crud');
const Boom = require('@hapi/boom');

module.exports = async request => {
  const { helperId } = request.auth.credentials;

  const job = await crud('jobs').readOne(request.params);

  if (helperId) {
    if (job.helperId && job.helperId !== helperId) throw Boom.unauthorized();
    if (job.status === 'draft') throw Boom.unauthorized();
  }

  const [services, client] = await Promise.all([
    crud('job_services').readAll({ jobId: job.id }),
    crud('clients')
      .readOne({ id: job.clientId })
      .then(client =>
        crud('users')
          .readOne({ id: client.userId })
          .then(user => ({
            id: client.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          }))
      ),
  ]);

  const feesBeforeTaxes = services.map(service => Number(service.flatFee)).reduce((acc, fee) => acc + fee, 0);
  const taxes = feesBeforeTaxes * 0.13;
  const feesAfterTaxes = feesBeforeTaxes + taxes;

  return {
    client: {
      id: client.id,
      email: client.email,
      firstName: client.firstName,
      lastName: client.lastName,
    },
    services: services.map(service => ({
      ...service,
      flatFee: `$${service.flatFee}`,
    })),
    status: job.status,
    notes: job.notes,
    city: job.city,
    country: job.country,
    line1: job.line1,
    line2: job.line2,
    postal_code: job.postal_code,
    state: job.state,
    feesBeforeTaxes: `$${feesBeforeTaxes.toFixed(2)}`,
    taxes: `$${taxes.toFixed(2)}`,
    feesAfterTaxes: `$${feesAfterTaxes.toFixed(2)}`,
  };
};
