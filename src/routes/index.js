import { Router } from "express";
import jobRouter from "./job.routes.js";
import companyRouter from "./company.route.js";
import cvRouter from "./cves.route.js";

const router = Router();

router.use("/jobs",jobRouter);
router.use("/companies",companyRouter);
router.use("/cves",cvRouter);

export default router;