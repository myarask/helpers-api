const crud = require('../../../services/crud');
const stripe = require('../../../services/stripe');

module.exports = table => async request => {
  const { userId } = request.payload;
  const user = await crud('users').readOne({ id: userId });

  const customer = await stripe.customers.create({
    source: 'tok_mastercard',
    email: user.email,
    description: [user.firstName, user.lastName].filter(Boolean).join(' '),
  });

  const content = {
    customer_id: customer.id,
    user_id: request.payload.user_id,
  };

  return crud(table).create(content);
};
