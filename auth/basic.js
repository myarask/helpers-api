module.exports = {
  validate: async (request, username, password) => {
    console.log(username, password);
    if (username === 'helper@helpers.ca' && password === 'helper@helpers.ca') {
      return {
        isValid: true,
        credentials: {
          userId: 1,
        },
      };
    }

    return { isValid: false };
  },
};
