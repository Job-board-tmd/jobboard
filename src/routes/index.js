import { Router } from "express";
import jobRouter from "./job.routes.js";

const router = Router();

router.use("/jobs", jobRouter);

export default router;