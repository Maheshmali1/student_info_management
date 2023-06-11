import { RequestHandler } from "express";
import { resSender } from "../utils";
import jwt from 'jsonwebtoken';
import { findbyToken } from "../services";


export const validateToken: RequestHandler = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(authHeader===undefined){
        return resSender(res,next, 400, false, "Token not present"); 
    }
    const token = authHeader!.split(" ")[1];
    if (token === null) {
        return resSender(res,next, 400, false, "Token not present");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, async(err, user) => {
        const result = await findbyToken(token);


        if (!result.success || err) {
            return resSender(res,next,403,false,"Token invalid");
        }
        next();
    })
}

