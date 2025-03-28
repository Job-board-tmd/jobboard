import { isValidObjectId } from "mongoose";
import jobModel from "../model/job.model.js";

const getAllJobs = async (req,res) => {
    try {
        const {limit=10,page=1,orderField = "_id",orderSort = 1} = req.query;
        if(!(Number(limit) && Number(page))){
            return res.status(400).send({
                message:"limit and page must be number"
            })
        };
        if (limit <= 0 || page <= 0) {
            return res.status(400).send({
                message: "Limit and page must be positive numbers.",
            });
        }
        const possibleFields = ["_id", "name", "createdAt","updatedAt"];
        const possibleSorts = [1, -1]
        if (
            !(            
                possibleFields.includes(orderField) &&
                possibleSorts.includes(Number(orderSort))
            )
        ) {
            return res.status(400).send({
                message: "sorttype yoki sortfielddan biri xato berildi",
            });
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
        console.log(error.message);
    }
};

const getOneJobs = async (req,res) => {
    try {
        const { id } = req.params;

        if(!(isValidObjectId(id))){
            return res.status(400).send({
                message: `Given id: ${id} is not valid`
            });
        };
    
        const job = await jobModel.findById(id);
    
        if(!job){
            return res.status(404).send({
                message: `Job with id: ${id} not found`
            });
        };
        
        res.send({
            message: "success",
            data: job
        });
    } catch (error) {
       console.log(error.message) 
    }
}

const createJobs = async (req,res) => {
    try {
        const { name,salary,companyId } = req.body;

        const foundedJobs = await jobModel.findOne({ name },{salary:1});
    
        if (foundedJobs) {
            return res.status(409).send({
                message: `Job: ${name} allaqachon mavjud`,
            });
        }
    
        const job = await jobModel.create({ name,salary,companyId })
    
        res.send({
            message: "success",
            data: job
        })
    } catch (error) {
        console.log(error.message);
    }
};

const updateJobs = async (req,res) => {
    try {
        const { id } = req.params;
        const { name,salary,companyId } = req.body;
    
        if(!(isValidObjectId(id))){
            return res.status(400).send({
                message: `Given id: ${id} is not valid`
            });
        };
    
        const job = await jobModel.findByIdAndUpdate(id, { name ,salary,companyId}, { new: true });
    
        if(!job){
            return res.status(404).send({
                message: `Job with id: ${id} not found`
            });
        };
    
        res.send({
            message: "success",
            data: job
        });
    } catch (error) {
        console.log(error.message);
    }
};

const deleteJobs = async (req,res) => {
    try {
        const { id } = req.params;

        if(!(isValidObjectId(id))){
            return res.status(400).send({
                message: `Given id: ${id} is not valid`
            });
        };
    
        const job = await jobModel.findByIdAndDelete(id);
    
        if(!job){
            return res.status(404).send({
                message: `Job with id: ${id} not found`
            });
        };
    
        res.send({
            message: "success",
            data: job
        });
    } catch (error) {
        console.log(error.message);
    }
}

export default { getAllJobs, createJobs, updateJobs, deleteJobs, getOneJobs }; 
