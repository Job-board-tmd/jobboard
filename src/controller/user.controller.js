import userModel from "../model/user.model.js";

const getAllUsers = async (req, res) => {
    const users = await userModel.find();
    res.send({
        message: "success",
        data: users,
    });
};

const createUser = async (req, res) => {
    const { name, email, imageUrl, jobId } = req.body;
    const user = new userModel({
        name,
        email,
        imageUrl,
        jobId,
    });
    await user.save();
    res.send({
        message: "success",
        data: user,
    });
};

const getUserById = async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if (!user) {
        return res.status(404).send({
            message: "User not found",
        });
    }
    res.send({
        message: "success",
        data: user,
    });
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email, imageUrl, jobId } = req.body;
    const user = await userModel.findByIdAndUpdate(
        id,
        { name, email, imageUrl, jobId },
        { new: true }
    );
    if (!user) {
        return res.status(404).send({
            message: "User not found",
        });
    }
    res.send({
        message: "success",
        data: user,
    });
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
        return res.status(404).send({
            message: "User not found",
        });
    }
    res.send({
        message: "success",
        data: user,
    });
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };