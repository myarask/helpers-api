module.exports = services => (request, h) => {
  console.log(h);
  return services.users.select();
};
