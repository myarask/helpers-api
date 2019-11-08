module.exports = services => request => {
  return services.users.read(request.query);
};
