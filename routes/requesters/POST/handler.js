const crud = require('../../../services/crud');
const stripe = require('../../../services/stripe');

module.exports = async request => {
  const customer = await stripe.customers.create({
    source: 'tok_mastercard',
  });

  const content = {
    customer_id: customer.id,
    user_id: request.payload.user_id,
  };

  return crud('requesters').create(content);
};
