const Hapi = require("@hapi/hapi");
const jwt = require("jsonwebtoken");
const secret = "shhhhhh";

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: "localhost"
  });

  await server.register([
    require("hapi-auth-jwt2"),
    require("hapi-auth-basic")
  ]);

  server.auth.strategy("simple", "basic", {
    validate: async (request, username, password) => {
      console.log(username, password);

      if (
        username === "helper@helpers.ca" &&
        password === "helper@helpers.ca"
      ) {
        return {
          isValid: true,
          credentials: {
            id: 1,
            isHelper: true,
            isClient: false,
            isRequester: false
          }
        };
      }

      if (
        username === "client@helpers.ca" &&
        password === "client@helpers.ca"
      ) {
        return {
          isValid: true,
          credentials: {
            id: 2,
            isHelper: false,
            isClient: true,
            isRequester: false
          }
        };
      }

      if (
        username === "requester@helpers.ca" &&
        password === "requester@helpers.ca"
      ) {
        return {
          isValid: true,
          credentials: {
            id: 3,
            isHelper: false,
            isClient: false,
            isRequester: true
          }
        };
      }

      return { isValid: false };
    }
  });

  server.auth.strategy("jwt", "jwt", {
    key: secret,
    validate: async function(decoded, request, h) {
      console.log(decoded);

      if ([1, 2, 3].includes(decoded.id)) {
        console.log(1);
        return { isValid: true };
      }

      console.log(2);
      return { isValid: false };
    }
  });

  server.auth.default("jwt");

  server.route([
    {
      method: "GET",
      path: "/",
      config: { auth: false },
      handler: () => "Hello World"
    },
    {
      method: "POST",
      path: "/sessions",
      config: { auth: "simple" },
      handler: (request, h) => {
        const { id, ...body } = request.auth.credentials;
        const token = jwt.sign({ id }, secret);

        const response = h.response(body);
        response.header("Token", token);
        return response;
      }
    },
    {
      method: "GET",
      path: "/restricted",
      config: { auth: "jwt" },
      handler: (request, h) => {
        const response = h.response({ text: "You used a Token!" });
        response.header("Authorization", request.headers.authorization);
        return response;
      }
    }
  ]);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
