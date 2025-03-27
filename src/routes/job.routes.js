import { Router } from "express";
import jobboardController from "../controller/jobboard.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createJobSchema, updateJobSchema } from "../schema/job.schema.js";

const jobRouter = Router();

jobRouter
    .get("/", jobboardController.getAllJobs)
    .get("/:id", jobboardController.getOneJobs)
    .post(
        "/",
        ValidationMiddleware(createJobSchema),
         jobboardController.createJobs)
    .put(
        "/:id",
        ValidationMiddleware(updateJobSchema), 
        jobboardController.updateJobs)
    .delete("/:id", jobboardController.deleteJobs)

export default jobRouter;