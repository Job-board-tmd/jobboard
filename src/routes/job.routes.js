import { Router } from "express";
import jobboardController from "../controller/jobboard.controller.js";

const jobRouter = Router();

jobRouter
    .get("/", jobboardController.getAllJobs)
    .get("/:id", jobboardController.getOneJobs)
    .post("/", jobboardController.createJobs)
    .put("/:id", jobboardController.updateJobs)
    .delete("/:id", jobboardController.deleteJobs)

export default jobRouter;