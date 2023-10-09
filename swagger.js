const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger-ui-dist/swagger.json')

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quincey API",
      description: "CRUD API ",
      version: "1.0.0",
    },
  },
  // looks for configuration in specified directories
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc({definition: swaggerDocument, apis: ["src/**/*.js"]});

function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
