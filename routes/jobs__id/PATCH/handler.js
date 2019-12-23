const crud = require('../../../services/crud');
const stripe = require('../../../services/stripe');

module.exports = table => async request => {
  const values = request.payload;
  const conditions = request.params;

  console.log(values);

  if (values.status === 'reviewing') {
    // Charge the requester for the job
    console.log(2);
    const job = await crud(table).readOne(conditions);

    const [requester, jobServices] = await Promise.all([
      crud('requesters').readOne({ id: job.requesterId }),
      crud('job_services').readAll({ jobId: job.id }),
    ]);

    const amount = jobServices.reduce((acc, obj) => acc + Number(obj.flat_fee) || 0, 0);
    console.log(jobServices);
    console.log(amount);
    if (amount) {
      const charge = await stripe.charges.create({
        amount: amount * 1.13, // Charge HST
        currency: 'cad',
        customer: requester.customerId,
      });

      console.log(charge);

      return crud(table).update(conditions, {
        ...values,
        chargeId: charge.id,
      });
    }
  }

  return crud(table).update(conditions, values);
};
