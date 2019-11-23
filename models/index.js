const tables = [
  'users',
  'sessions',
  'requesters',
  'requester_clients',
  'clients',
  'helpers',
  'admins',
  'jobs',
  'job_services',
  'services',
];
const BaseModel = require('./_base');

const models = tables.reduce(
  (acc, table) => ({
    ...acc,
    [table]: class Session extends BaseModel {
      static get tableName() {
        return table;
      }
    },
  }),
  {}
);

module.exports = models;
