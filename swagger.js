const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Expressjs Lambda Boilerplate API",
    description:
      "A boilerplate for ExpressJS applications that can be deployed to AWS Lambda",
  },
  host: process.env.DEPLOY
    ? process.env.npm_package_config_lambdaBaseUrl
    : "localhost:3000",
  schemes: ["https", "http"],
};

const outputFile = "./src/swagger-spec.json";
const routes = ["src/controllers/**/*.ts"];

swaggerAutogen(outputFile, routes, doc);
