const crud = require('../../../services/crud');
const bcrypt = require('bcrypt');

module.exports = request => {
  const { email, password } = request.payload;
  const saltRounds = 10;

  const hash = bcrypt.hashSync(password, saltRounds);
  const content = {
    email,
    hash,
  };

  return crud('users')
    .create(content)
    .then(({ hash, ...rest }) => rest);
};
