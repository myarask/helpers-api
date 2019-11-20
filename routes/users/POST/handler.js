const crud = require('../../../services/crud');
const bcrypt = require('bcrypt');

module.exports = request => {
  const { password, ...rest } = request.payload;
  const saltRounds = 10;

  const hash = bcrypt.hashSync(password, saltRounds);
  const content = {
    hash,
    ...rest,
  };

  return crud('users')
    .create(content)
    .then(({ hash, ...rest }) => rest);
};
