import { isValidObjectId } from "mongoose";
import cvModel from "../model/cv.model.js";

const getAllCVs = async (req, res) => {
    try {
        const { limit = 10, page = 1, orderField = "_id", orderSort = 1 } = req.query;

        if (!(Number(limit) && Number(page))) {
            return res.status(400).send({
                message: "limit and page must be numbers"
            })
        };

        if (limit <= 0 || page <= 0) {
            return res.status(400).send({
                message: "manfiy son bo'lmasligi kk",
            });
        }

        const possibleFields = ["_id", "userId", "title", "createdAt", "updatedAt"];
        const possibleSorts = [1, -1];

        if (!(possibleFields.includes(orderField) && possibleSorts.includes(Number(orderSort)))) {
            return res.status(400).send({
                message: "OrderField yoki orderSortdan bittasi xato",
            })
        };

        const totalCVs = await cvModel.countDocuments();

        const cvs = await cvModel.find()
            .sort({ [orderField]: Number(orderSort) })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.send({
            message: "success",
            data: cvs,
            count: totalCVs,
            limit: Number(limit),
            page: Number(page)
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            message: "Xatolik"
        });
    }
};
const getOneCV = async (req, res) => {
    try {
        const { id } = req.params

        if (!(isValidObjectId(id))) {
            return res.status(400).send({
                message: `given id: ${id} is not valid`
            })
        }

        const cv = await cvModel.findById(id);

        if (!cv) {
            return res.status(404).send({
                message: `CV with id: ${id} not found`
            });
        }

        res.send({
            message: "success",
            data: cv
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            message: "xatolik"
        });
    }
};
const createCV = async (req, res) => {
    try {
        const { userId, title, content } = req.body;

        if (!userId || !title || !content) {
            return res.status(400).send({
                message: "o'zgaruvchilarni hammasi kiritilsin"
            });
        }

        const existingCV = await cvModel.findOne({ userId });

        if (existingCV) {
            return res.status(409).send({
                message: `CV for userId: ${userId} already exists`,
            });
        }

        const cv = await cvModel.create({ userId, title, content });

        res.status(201).send({
            message: "success",
            data: cv
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            message: "xatolik"
        });
    }
}
const updateCV = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!(isValidObjectId(id))) {
            return res.status(400).send({
                message: `Given id: ${id} is not valid`
            });
        }
        const updatedCV = await cvModel.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!updatedCV) {
            return res.status(404).send({
                message: `CV with id: ${id} not found`
            });
        }

        res.send({
            message: "CV updated successfully",
            data: updatedCV
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            message: "xatolik"
        });
    }
};
const deleteCV = async (req, res) => {
    try {
        const { id } = req.params;

        if (!(isValidObjectId(id))) {
            return res.status(400).send({
                message: `Given id: ${id} is not valid`
            });
        }
        const deletedCV = await cvModel.findByIdAndDelete(id);
        if (!deletedCV) {
            return res.status(404).send({
                message: `CV with id: ${id} not found`
            })
        }

        res.send({
            message: "CV deleted successfully",
            data: deletedCV
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            message: "xatolik"
        })
    }
};

export default { getAllCVs, getOneCV, createCV, updateCV, deleteCV };
