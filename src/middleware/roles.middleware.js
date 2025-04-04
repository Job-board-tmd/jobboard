import { BaseException } from "../exception/base.exception.js";

export const  Roles = (...roles)=>{
    return (req,_,next)=>{
        const userRole = req.role;

        if(!roles.includes(userRole)){
            return next(new BaseException("This action is forbidden for you!",403))
        }

        next();
    }
}