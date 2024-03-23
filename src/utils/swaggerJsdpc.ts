const swaggerJsdoc = require("swagger-jsdoc");

const getOpenapiSpecification = () => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Expressjs Lambda Boilerplate API",
        version: "1.0.0",
      },
    },
    apis: ["./src/controllers/*/*.ts"],
  };
  return swaggerJsdoc(options);
};

export default getOpenapiSpecification;
