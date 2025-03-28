import { Router } from "express";
import CVController from "../controller/CV.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createCV, updateCV } from "../schema/cves.schema.js";


const cvRouter = Router();

cvRouter.get("/",CVController.getAllCVs)
    .get("/:id",CVController.getOneCV)
    .put("/:id",
        ValidationMiddleware(updateCV),
        CVController.updateCV)
    .post("/",
        ValidationMiddleware(createCV),
        CVController.createCV)
    .delete("/:id",CVController.deleteCV);

export default cvRouter;