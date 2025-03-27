import { Router } from "express";
import jobRouter from "./job.routes.js";
import companyRouter from "./company.route.js";
import cvRouter from "./cves.route.js";

const router = Router();

<<<<<<< HEAD
router.use("/jobs",jobRouter);
router.use("/companies",companyRouter);
router.use("/cves",cvRouter);
=======
router.use("/jobs", jobRouter);
>>>>>>> 46874ad6da061f2b8feb422da351fcdccbbed0ca

export default router;