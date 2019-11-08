module.exports = services => request => {
  return services.users.create(request.payload);
};
