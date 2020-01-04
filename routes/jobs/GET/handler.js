const validate = require('./validate');
const axios = require('axios');
const models = require('../../../models');
const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';

module.exports = table => async request => {
  validate(request);

  const { statuses, offset, limit, lng, lat, ...conditions } = request.query;

  const [jobs, count] = await Promise.all([
    models.jobs
      .query()
      .where(conditions)
      .whereIn('status', (statuses || '').split(','))
      .offset(offset)
      .limit(limit),
    models.jobs
      .query()
      .andWhere(conditions)
      .count('id')
      .first(),
  ]);

  if (lng !== undefined && lat !== undefined) {
    const promises = jobs.reduce((acc, job) => {
      const options = {
        params: {
          key: process.env.GOOGLE_KEY,
          origins: `${lat},${lng}`,
          destinations: `${job.lat},${job.lng}`,
        },
      };
      const promise = axios.get(url, options).then(resp => {
        console.log(resp.data);
        console.log(resp.data.rows[0].elements);
        const element = resp.data.rows[0].elements[0];
        if (element.status === 'OK') {
          job.distance = resp.data.rows[0].elements[0].distance.text;
          job.duration = resp.data.rows[0].elements[0].duration.text;
        }
      });
      return [...acc, promise];
    }, []);

    await Promise.all(promises);
  }

  return { data: jobs, length: parseInt(count.count) };
};
