import { Request,Response } from "express";


export const resSender = (res:Response,statusCode:number,success:boolean, message:any)=>{
    res.status(statusCode).json({
        success:success,
        message:message
    })
}