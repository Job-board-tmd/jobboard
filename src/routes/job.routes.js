import { Router } from "express";
import jobboardController from "../controller/jobboard.controller.js";

const jobRouter = Router();

jobRouter.get("/",jobboardController.getAllJobs);

export default jobRouter;