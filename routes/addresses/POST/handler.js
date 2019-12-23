const crud = require('../../../services/crud');
const axios = require('axios');
const Boom = require('@hapi/boom');
const url = 'https://maps.googleapis.com/maps/api/geocode/json';

module.exports = table => async request => {
  const { payload } = request;
  const address = [payload.line1, payload.line2, payload.postal_code, payload.city, payload.state, payload.country]
    .filter(Boolean)
    .join(', ');

  const options = {
    params: {
      key: process.env.GOOGLE_KEY,
      address,
    },
  };
  const results = await axios.get(url, options).then(resp => resp.data.results);

  if (!results.length) {
    throw Boom.badRequest('longitude and latitude cannot be found');
  }

  return crud(table).create({
    ...payload,
    ...results[0].geometry.location, // lng and lat
  });
};
