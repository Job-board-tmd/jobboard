import { Router } from "express";
import CVController from "../controller/CV.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createCV, updateCV } from "../schema/cves.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";


const cvRouter = Router();

cvRouter.get("/",
    Protected(true),
    Roles('VIEWER','OWNER','SUPER_ADMIN'),
    CVController.getAllCVs)
    .get("/:id",
        Protected(true),
        Roles('VIEWER','OWNER','SUPER_ADMIN'),
        CVController.getOneCV)
    .put("/:id",
        Protected(true),
        Roles('VIEWER',"SUPER_ADMIN"),
        ValidationMiddleware(updateCV),
        CVController.updateCV)
    .post("/",
        Protected(true),
        Roles('VIEWER'),
        ValidationMiddleware(createCV),
        CVController.createCV)
    .delete("/:id",
        Protected(true),
        Roles('VIEWER','SUPER_ADMIN'),
        CVController.deleteCV);

export default cvRouter;