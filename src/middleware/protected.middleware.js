import { ACCESS_TOKEN_SECRET } from "../config/jwt.config.js";
import { BaseException } from "../exception/base.exception.js";
import jwt from "jsonwebtoken";

export const Protected = (isProtected) =>{
    return (req,res,next)=>{
        if(!isProtected){
            req.role = "VIEWER";
            return next()
        }

        const token  = req.headers["authorization"];
        if(!token || !token.includes("Bearer ") || !token.split(" ")[1]){
            return next(new BaseException("Please enter token!",400))
        }

        const accessToken = token.split(" ")[1]

        try {
            const decodedData = jwt.verify(accessToken,ACCESS_TOKEN_SECRET);

            req.role = decodedData.role;
            req.user = decodedData.id;

            next()
        } catch (error) {
            if(error instanceof jwt.TokenExpiredError){
                return next(new BaseException("Token is expired!",406))
            }
            else if(error instanceof jwt.NotBeforeError){
                return next(new BaseException("Not before error!",409))
            }
            else if(error instanceof jwt.JsonWebTokenError){
                return next(new BaseException("Invalid token!",400))
            }
            else{
                return next(error)
            }

        }
    }
}