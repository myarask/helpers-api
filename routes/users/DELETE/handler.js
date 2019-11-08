module.exports = services => request => {
  return services.users.delete(request.params.id);
};
