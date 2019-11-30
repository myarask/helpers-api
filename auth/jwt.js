module.exports = {
  key: process.env.JWT_SECRET,
  validate: credentials => ({ isValid: true, credentials }),
};
