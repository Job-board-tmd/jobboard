import { compare, hash } from "bcrypt";
import userModel from "../model/user.model.js";

const getAllUsers = async (_, res) => {
    const users = await userModel.find();
    res.send({
        message: "success",
        data: users,
    });
};

const register = async (req,res) => {
    const {name,email,password} = req.body;

    const foundedUser = await userModel.findOne({email});

    if(foundedUser){
        res.status(400).send({
            message:"This user is already exists"
        });
    };

    const passwordHash = await hash(password, 10);

    const result = await userModel.create({
        name,
        email,
        password:passwordHash,
    });

    res.status(201).send({
        message:"success",
        data: result
    })
};

const login = async (req,res) => {
    const {email,password} = req.body;

    const foundedUser = await userModel.findOne({email});

    if (!foundedUser){
        res.status(400).send({
            message:"User with this email not found"
        })
    }

    const isMatch = await compare(password, foundedUser.password);

    if(!isMatch){
        return res.status(400).send({
            message:"Invalid password"
        })
    };

    res.send({
        message:"success",
        data: foundedUser
    })
}




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

export default { getAllUsers, login , register, updateUser, deleteUser };