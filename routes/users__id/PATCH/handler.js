module.exports = services => request => {
  return services.users.update(request.params.id, request.payload);
};
