module.exports = {
  key: process.env.JWT_SECRET,
  validate: async (decoded, request, h) => {
    if ([1, 2, 3].includes(decoded.id)) {
      return { isValid: true };
    }

    return { isValid: false };
  },
};
