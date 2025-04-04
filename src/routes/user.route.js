import { Router } from "express";
import userController from "../controller/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { loginUser, registerUser } from "../schema/user.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";

const userRoute = Router();

userRoute
    .get("/",
        Protected(true),
        Roles('OWNER','SUPER_ADMIN'),
         userController.getAllUsers)
    // .get("/register",userController.redirectRegister)
    .post("/register",
        Protected(false),
        Roles('VIEWER','OWNER','SUPER_ADMIN'),
        ValidationMiddleware(registerUser),
        userController.register)
    .post("/login",
        Protected(false),
        Roles('VIEWER','OWNER','SUPER_ADMIN'),
        ValidationMiddleware(loginUser),
        userController.login)
    .put("/:id",
        Protected(true),
        Roles('VIEWER','OWNER','SUPER_ADMIN'),
        userController.updateUser)
    .delete("/:id",
         Protected(true),
        Roles('VIEWER','OWNER','SUPER_ADMIN'),
        userController.deleteUser);


export default userRoute;