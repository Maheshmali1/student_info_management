import { NextFunction, Response } from "express";


export const resSender = (res:Response,next:NextFunction,statusCode:number,success:boolean, message:any)=>{
    if(message instanceof Error){
        // add logger here.
        return next!(message);
    } 

    res.status(statusCode).json({
        success:success,
        message:message
    })
}