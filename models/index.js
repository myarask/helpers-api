const tables = require('../tables');
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
