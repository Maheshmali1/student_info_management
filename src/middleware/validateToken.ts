import { RequestHandler } from "express";
import { resSender } from "../utils";
import jwt from 'jsonwebtoken';


export const validateToken: RequestHandler = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(authHeader===undefined){
        return resSender(res, 400, false, "Token not present"); 
    }
    const token = authHeader!.split(" ")[1];
    if (token === null) {
        return resSender(res, 400, false, "Token not present");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
        if (err) {
            return resSender(res,403,false,"Token invalid");
        }
        next();
    })
}

