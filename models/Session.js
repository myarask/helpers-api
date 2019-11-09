const BaseModel = require('./_base');

class Session extends BaseModel {
  static get tableName() {
    return 'sessions';
  }
}

module.exports = Session;
