const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Expressjs Lambda Boilerplate API",
    description:
      "A boilerplate for ExpressJS applications that can be deployed to AWS Lambda",
  },
  host: process.env.DEPLOY
    ? process.env.npm_package_config_lambdaBaseUrl
    : "localhost/v1",
  schemes: ["https", "http"],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "For accessing the API a valid JWT token must be passed in all the queries in the 'Authorization' header. A valid JWT token is generated by the API and retured in the response of a successful SignIn or SignUp request. The following value must be entered in the 'Value' field: Bearer {JWT token}",
    },
  },
  security: [{ Bearer: [] }],
};

const outputFile = "./src/swagger-spec.json";
const routes = ["src/controllers/**/*.ts"];

swaggerAutogen(outputFile, routes, doc);
