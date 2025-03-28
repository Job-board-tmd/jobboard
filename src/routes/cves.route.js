import { Router } from "express";
import CVController from "../controller/CV.controller.js";


const cvRouter = Router();

cvRouter.get("/",CVController.getAllCVs)
    .get("/:id",CVController.getOneCV)
    .put("/:id",CVController.updateCV)
    .post("/",CVController.createCV)
    .delete("/:id",CVController.deleteCV);

export default cvRouter;