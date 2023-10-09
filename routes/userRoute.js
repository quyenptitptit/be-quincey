const express = require("express");
const userController = require("../controllers/userController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-ui-dist/swagger.json");

const userRouter = express.Router();
// userRouter.use("/api-docs", swaggerUi.serve)
// userRouter.get("/api-docs", swaggerUi.setup(swaggerDocument), userController.registerUser)

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/users", userController.getAll);
userRouter.get("/user/:id", userController.getUser);
userRouter.put("/user/:id", userController.updateUser);
userRouter.put("/updatePassword", userController.updatePassword);

module.exports = userRouter;
