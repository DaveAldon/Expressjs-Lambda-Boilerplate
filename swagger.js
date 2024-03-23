const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Expressjs Lambda Boilerplate API",
    description:
      "A boilerplate for ExpressJS applications that can be deployed to AWS Lambda",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger-spec.json";
const routes = ["src/controllers/**/*.ts"];

swaggerAutogen(outputFile, routes, doc);
