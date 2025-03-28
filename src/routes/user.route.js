import { Router } from "express";
import userController from "../controller/user.controller.js";

const userRoute = Router();

userRoute
    .get("/", userController.getAllUsers)
    .get("/:id", userController.getUserById)
    .post("/", userController.createUser)
    .put("/:id", userController.updateUser)
    .delete("/:id", userController.deleteUser);


export default userRoute;