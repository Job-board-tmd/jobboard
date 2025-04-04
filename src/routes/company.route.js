import { Router } from "express";
import companyController from "../controller/company.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createCompanySchema,updateCompanySchema } from "../schema/company.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { upload } from "../config/multer.config.js";
const companyRouter = Router();

companyRouter.get("/",
    Protected(false),
    companyController.getAllCompanies)
    .post(
        "/",
        upload.single("image"),
        Protected(true),
        ValidationMiddleware(createCompanySchema),
        companyController.createCompany)
    .get("/:id",
        Protected(false),
        companyController.getCompany)
    .put(
        "/:id",
        Protected(true),
        ValidationMiddleware(updateCompanySchema),
        companyController.updateCompany)
    .delete("/:id",
        Protected(true),
        companyController.deleteCompany);

export default companyRouter;