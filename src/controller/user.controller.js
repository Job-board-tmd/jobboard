import { compare, hash } from "bcrypt";
import userModel from "../model/user.model.js";
import { BaseException } from "../exception/base.exception.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_TIME, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRE_TIME, REFRESH_TOKEN_SECRET } from "../config/jwt.config.js";
import { sendMail } from "../utils/mail.utils.js";

const getAllUsers = async (_, res) => {
    const users = await userModel.find();
    res.send({
        message: "success",
        data: users,
    });
};

// const redirectRegister = async (_,res) => {
//     res.render("index")
// }

const register = async (req,res,next) => {
    try {
        const {name,email,password} = req.body;

    const foundedUser = await userModel.findOne({email});

    if(foundedUser){
        throw new BaseException("This user is already exists",400);
    };

    const passwordHash = await hash(password, 10);

    const result = await userModel.create({
        name,
        email,
        password:passwordHash,
    });

    const givenToken = jwt.sign(
        {id: result.id,role: result.role},
        ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRE_TIME,
            algorithm:"HS256"
        }
    );

    const refreshToken = jwt.sign(
        {id: result.id,role: result.role},
        REFRESH_TOKEN_SECRET,
        {
            expiresIn:REFRESH_TOKEN_EXPIRE_TIME,
            algorithm:"HS256"
        }
    )

    await sendMail({
        to: email,
        subject:"Welcome",
        text:`Hello ${name}. We are happy to have you in out community . Hope you have best experience with our app!`
    })

    // console.log("success");

    res.status(201).send({
        message:"success",
        data: result,
        tokens: {
            givenToken,
            refreshToken
        }
    })
    } catch (error) {
       next(error) 
    }
};

const login = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const foundedUser = await userModel.findOne({email});
    
        if (!foundedUser){
            throw new BaseException("User with this email not found",400)
        }
    
        const isMatch = await compare(password, foundedUser.password);
    
        if(!isMatch){
            return res.status(400).send({
                message:"Invalid password"
            })
        };

        const givenToken = jwt.sign(
            {id: foundedUser.id,role: foundedUser.role},
            ACCESS_TOKEN_SECRET,
            {
                expiresIn:ACCESS_TOKEN_EXPIRE_TIME,
                algorithm:"HS256"
            }
        );
    
        const refreshToken = jwt.sign(
            {id: foundedUser.id,role: foundedUser.role},
            REFRESH_TOKEN_SECRET,
            {
                expiresIn:REFRESH_TOKEN_EXPIRE_TIME,
                algorithm:"HS256"
            }
        )
    
        res.send({
            message:"success",
            data: foundedUser,
            tokens: {
                givenToken,
                refreshToken
            }
        })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res,next) => {
    try {
        const id = req.params.id;
        const { name, email, imageUrl, jobId } = req.body;
        const user = await userModel.findByIdAndUpdate(
            id,
            { name, email, imageUrl, jobId },
            { new: true }
        );
        if (!user) {
            throw new BaseException("User not found",404);
        }
        res.send({
            message: "success",
            data: user,
        });
    } catch (error) {
        next(error)
    }
};

const deleteUser = async (req, res,next) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            throw new BaseException("User not found",404);
        }
        res.send({
            message: "success",
            data: user,
        });
    } catch (error) {
        next(error)
    }
};

export default { getAllUsers, login , register, updateUser, deleteUser };