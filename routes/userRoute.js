const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
/**
 * @openapi
 * /users:
    get:
      tags:
        - user
      summary: 'Get users'
      responses:
        '200':
          description: 'Get all user successfully!'
          content:
            application/json:
              schema:
                type:  array
                items:
                  $ref: '#/components/schemas/User'          
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User' 
        '500': 
          description: 'Exception'
 */
userRouter.get("/users", userController.getAll);

userRouter.get("/user/:id", userController.getUser);
userRouter.put("/user/:id", userController.updateUser);
userRouter.put("/updatePassword", userController.updatePassword);

module.exports = userRouter;
