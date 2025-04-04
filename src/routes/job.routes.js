import { Router } from "express";
import jobboardController from "../controller/jobboard.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createJobSchema, updateJobSchema } from "../schema/job.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";

const jobRouter = Router();

jobRouter
    .get("/",
        Protected(false),
        Roles('VIEWER','OWNER','SUPER_ADMIN'),
         jobboardController.getAllJobs)
    // .get("/:id", jobboardController.getOneJobs)
    .post(
        "/",
        Protected(true),
        Roles('OWNER','SUPER_ADMIN'),
        ValidationMiddleware(createJobSchema),
         jobboardController.createJobs)
    .put(
        "/:id",
        Protected(true),
        Roles('OWNER','SUPER_ADMIN'),
        ValidationMiddleware(updateJobSchema), 
        jobboardController.updateJobs)
    .delete("/:id",
        Roles('OWNER','SUPER_ADMIN'),
        Protected(true),
         jobboardController.deleteJobs);

export default jobRouter;