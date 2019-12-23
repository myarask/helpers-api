const crud = require('../../../services/crud');
const stripe = require('../../../services/stripe');

module.exports = table => async request => {
  const values = request.payload;
  const conditions = request.params;

  if (values.status === 'reviewing') {
    // Charge the requester for the job
    const job = await crud(table).readOne(conditions);

    const [requester, jobServices] = await Promise.all([
      crud('requesters').readOne({ id: job.requesterId }),
      crud('job_services').readAll({ jobId: job.id }),
    ]);

    const amount = jobServices.reduce((acc, obj) => acc + Number(obj.flatFee) || 0, 0);

    if (amount) {
      // TODO: put chargeId in the jobs table?
      const charge = await stripe.charges.create({
        amount: Math.round(amount * 1.13 * 100), // Charge HST and convert to cents
        currency: 'cad',
        customer: requester.customerId,
        metadata: {
          jobId: job.id,
        },
      });
    }
  }

  return crud(table).update(conditions, values);
};
