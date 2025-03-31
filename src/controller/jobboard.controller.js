import { isValidObjectId } from "mongoose";
import jobModel from "../model/job.model.js";
import { BaseException } from "../exception/base.exception.js";

const getAllJobs = async (req,res,next) => {
    try {
        const {limit=10,page=1,orderField = "_id",orderSort = 1} = req.query;
        if(!(Number(limit) && Number(page))){
            return res.status(400).send({
                message:"limit and page must be number"
            })
        };
        if (limit <= 0 || page <= 0) {
            throw new BaseException("Limit and page must be positive numbers.",400);
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
        const totalJobs = await jobModel.countDocuments();

        const jobs = await jobModel.find()
            .sort({ [orderField]: Number(orderSort) })
            .skip((page - 1)* limit) 
            .limit(Number(limit));

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

const getOneJobs = async (req,res,next) => {
    try {
        const { id } = req.params;

        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };
    
        const job = await jobModel.findById(id);
    
        if(!job){
            throw new BaseException(`Job with id: ${id} not found`,404);
        };
        
        res.send({
            message: "success",
            data: job
        });
    } catch (error) {
       next(error)
    }
}

const createJobs = async (req,res,next) => {
    try {
        const { name,salary,companyId } = req.body;

        const foundedJobs = await jobModel.findOne({ name },{salary:1});
    
        if (foundedJobs) {
            throw new BaseException(`Job: ${name} allaqachon mavjud`,409);
        }
    
        const job = await jobModel.create({ name,salary,companyId })
    
        res.send({
            message: "success",
            data: job
        })
    } catch (error) {
        next(error)
    }
};

const updateJobs = async (req,res,next) => {
    try {
        const { id } = req.params;
        const { name,salary,companyId } = req.body;
    
        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };
    
        const job = await jobModel.findByIdAndUpdate(id, { name ,salary,companyId}, { new: true });
    
        if(!job){
            throw new BaseException(`Job with id: ${id} not found`,404);
        };
    
        res.send({
            message: "success",
            data: job
        });
    } catch (error) {
        next(error)
    }
};

const deleteJobs = async (req,res,next) => {
    try {
        const { id } = req.params;

        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };
    
        const job = await jobModel.findByIdAndDelete(id);
    
        if(!job){
            throw new BaseException(`Job with id: ${id} not found`,404);
        };
    
        res.send({
            message: "success",
            data: job
        });
    } catch (error) {
        next(error)
    }
}

export default { getAllJobs, createJobs, updateJobs, deleteJobs, getOneJobs }; 
