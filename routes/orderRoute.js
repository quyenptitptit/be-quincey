const express = require("express");
const orderController = require("../controllers/orderController");
const swaggerUi= require("swagger-ui-express")
const swaggerDocument = require('../swagger-ui-dist/swagger.json')

const orderRouter = express.Router();
// orderRouter.use("/api-docs", swaggerUi.serve)
// orderRouter.get("/api-docs", swaggerUi.setup(swaggerDocument), orderController.get)

orderRouter.get("", orderController.get);
orderRouter.get("/:id", orderController.getById);
orderRouter.post("", orderController.create);
orderRouter.put("/:id", orderController.update);
orderRouter.delete("/:id", orderController.delete);

module.exports = orderRouter;
