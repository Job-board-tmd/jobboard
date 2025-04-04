import { BaseException } from "../exception/base.exception.js";
import companyModel from "../model/company.model.js";
import { isValidObjectId } from "mongoose";

const getAllCompanies = async (req,res,next) => {
    try {
        const {limit=10,page=1,orderField = "_id",orderSort = 1} = req.query;
        if(!(Number(limit) && Number(page))){
            throw new BaseException("limit and page must be number",400)
        };
        if (limit <= 0 || page <= 0) {
            throw new BaseException("limit and page must be positive numbers",400);
        }
        const possibleFields = ["_id", "name", "createdAt","updatedAt"];
        const possibleSorts = [1, -1]
        if (
            !(            
                possibleFields.includes(orderField) &&
                possibleSorts.includes(Number(orderSort))
            )
        ) {
            throw new BaseException("sorttype yoki sortfielddan biri xato berildi",400);
        }
        const totalJobs = await companyModel.countDocuments();

        const jobs = await companyModel.find()
            .sort({ [orderField]: Number(orderSort) })
            .skip((page - 1)* limit) 
            .limit(Number(limit))
            .populate("companyId");

        res.send({
            message: "success",
            data: jobs,
            count: totalJobs,
            limit: Number(limit),
            page: Number(page)
        })
    } catch (error) {
        next(error)
    }
};

const getCompany = async (req,res,next) => {
    try {
        const id = req.params.id
        
        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };

        const company = await companyModel.findById(id);

        if(!company){
            throw new BaseException(`Given company: ${id} is not found`,400)
        }

        res.status(200).send({
            message:"success",
            data:company
        });
    } catch (error) {
        next(error)
    }
};

const createCompany = async (req,res,next) => {
    try {
        const {name,location} = req.body;
        const foundedCompanies = await companyModel.findOne({ name });
    
        if (foundedCompanies) {
            throw new BaseException(`company: ${name} allaqachon mavjud`,409);
        }
    
        const company = await companyModel.create({name,
            location,
            imageUrl: req.file.filename})
        res.status(200).send({
            message:"success",
            data:company
        });
    } catch (error) {
        next(error)
    }
};

const updateCompany = async (req,res,next) => {
    try {
        const id = req.params.id;
        
        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };

        const {name,location} = req.body;
        const company = await companyModel.findByIdAndUpdate(id, { name,location }, { new: true });
        
        if(!company){
            throw new BaseException(`Given company: ${id} is not found`,400)
        }
        res.status(200).send({
            message:"success",
            data:company
        });
    } catch (error) {
        next(error)
    }
};

const deleteCompany = async (req,res,next) => {
    try {
        const id = req.params.id;
        
        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };

        const company = await companyModel.findByIdAndDelete(id)
        
        if(!company){
            throw new BaseException(`Given company: ${id} is not found`,400)
        }
        res.status(200).send({
            message:"success",
            data:company
        })
    } catch (error) {
        next(error)
    }
};



export default {getAllCompanies,getCompany,createCompany,updateCompany,deleteCompany}