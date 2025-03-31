import { Router } from "express";
import userController from "../controller/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { loginUser, registerUser } from "../schema/user.schema.js";

const userRoute = Router();

userRoute
    .get("/", userController.getAllUsers)
    // .get("/register",userController.redirectRegister)
    .post("/register",
        ValidationMiddleware(registerUser),
        userController.register)
    .post("/login",
        ValidationMiddleware(loginUser),
        userController.login)
    .put("/:id", userController.updateUser)
    .delete("/:id", userController.deleteUser);


export default userRoute;