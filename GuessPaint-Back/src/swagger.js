// swagger.js CORREGIRLO
const swaggerJsdoc = require('swagger-jsdoc');

const options = 
  {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "guessPaint Express Api with swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Apl",
        },
      },
      paths: {
        
      },
      servers: [
        {
          url: "http://localhost:3000/api",
        },
      ],
    },
    apis: ['./src/routes/*.ts'],
  };

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
