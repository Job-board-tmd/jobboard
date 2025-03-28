import companyModel from "../model/company.model.js";
import { isValidObjectId } from "mongoose";

const getAllCompanies = async (req,res) => {
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
        const totalJobs = await companyModel.countDocuments();

        const jobs = await companyModel.find()
            .sort({ [orderField]: Number(orderSort) })
            .skip((page - 1)* limit) 
            .limit(Number(limit))
            .populate("Jobs");

        res.send({
            message: "success",
            data: jobs,
            count: totalJobs,
            limit: Number(limit),
            page: Number(page)
        })
    } catch (error) {
        console.log(error.message)
    }
}

const getCompany = async (req,res) => {
    try {
        const id = req.params.id
        
        if(!(isValidObjectId(id))){
            return res.status(400).send({
                message: `Given id: ${id} is not valid`
            });
        };

        const company = await companyModel.findById(id);

        if(!company){
            return res.status(400).send({
                message: `Given company: ${id} is not found`
            })
        }

        res.status(200).send({
            message:"success",
            data:company
        });
    } catch (error) {
        console.log(error.message)
    }
}

const createCompany = async (req,res) => {
    try {
        const {name} = req.body;
        const foundedCompanies = await companyModel.findOne({ name });
    
        if (foundedCompanies) {
            return res.status(409).send({
                message: `company: ${name} allaqachon mavjud`,
            });
        }
    
        const company = await companyModel.create({name})
        res.status(200).send({
            message:"success",
            data:company
        });
    } catch (error) {
        console.log(error.message)
    }
}

const updateCompany = async (req,res) => {
    try {
        const id = req.params.id;
        
        if(!(isValidObjectId(id))){
            return res.status(400).send({
                message: `Given id: ${id} is not valid`
            });
        };

        const {name,jobId} = req.body;
        const company = await companyModel.findByIdAndUpdate(id, { name }, { new: true });
        
        if(!company){
            return res.status(400).send({
                message: `Given company: ${id} is not found`
            })
        }
        res.status(200).send({
            message:"success",
            data:company
        });
    } catch (error) {
        console.log(error.message)
    }
}

const deleteCompany = async (req,res) => {
    try {
        const id = req.params.id;
        
        if(!(isValidObjectId(id))){
            return res.status(400).send({
                message: `Given id: ${id} is not valid`
            });
        };

        const company = await companyModel.findByIdAndDelete(id)
        
        if(!company){
            return res.status(400).send({
                message: `Given company: ${id} is not found`
            })
        }
        res.status(200).send({
            message:"success",
            data:company
        })
    } catch (error) {
        console.log(error.message)
    }
}



export default {getAllCompanies,getCompany,createCompany,updateCompany,deleteCompany}