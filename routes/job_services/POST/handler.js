const crud = require('../../../services/crud');

module.exports = table => async request => {
  const { serviceId, jobId } = request.payload;

  const service = await crud('services').readById(serviceId);

  const { name, description, flatFee } = service;

  const content = {
    jobId,
    serviceId,
    name,
    description,
    flatFee,
  };

  return crud(table).create(content);
};
