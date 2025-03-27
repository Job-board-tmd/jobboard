import { Router } from "express";
import companyController from "../controller/company.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createCompanySchema,updateCompanySchema } from "../schema/company.schema.js";

const companyRouter = Router();

companyRouter.get("/",companyController.getAllCompanies)
    .post(
        "/",
        ValidationMiddleware(createCompanySchema),
        companyController.createCompany)
    .get("/:id",companyController.getCompany)
    .put(
        "/:id",
        ValidationMiddleware(updateCompanySchema),
        companyController.updateCompany)
    .delete("/:id",companyController.deleteCompany);

export default companyRouter;