import Joi from "joi"

export const createCompanySchema = Joi.object({
    name: Joi.string().min(4).max(70).alphanum().required(),
}).required()

export const updateCompanySchema = Joi.object({
    name: Joi.string().min(4).max(70).alphanum().required(),
})