import jwt from 'jsonwebtoken';
const dotenv = require("dotenv");
dotenv.config();

import { DBresult,Token} from "../models";



// generate access tokens
export const generateAccessToken = async(username:any):Promise<DBresult>=>{
    const accessToken = await jwt.sign(username,process.env.ACCESS_TOKEN_SECRET!, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE}) 
    try{
        const newToken = new Token({token:accessToken});
        await newToken.save();
        return {
            statusCode:201,
            success:true,
            message:{data:accessToken}
        }
    }
    catch(error){
        return {
            statusCode:500,
            success:false,
            message:error
        }
    }

}


// generate refreshTokens
export const generateRefreshToken = async(username:any):Promise<DBresult>=>{
    const refreshToken = await jwt.sign(username, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: process.env.REFRESH_TOKEN_EXPIRE})
    
    try{
        const newToken = new Token({token:refreshToken});
        await newToken.save();
        return {
            statusCode:201,
            success:true,
            message:{data:refreshToken}
        }
    }
    catch(error){
        return{
            statusCode:500,
            success:false,
            message:error
        }
    }

}


// Find token 
export const findbyToken = async(token:string):Promise<DBresult>=>{
    try{
        const result = await Token.findOne({token:token});
        if(result===undefined){
            return{
                statusCode:404,
                success:false,
                message:"Invalid token",
            }
        }

        return {
            statusCode:200,
            success:true,
            message:{data:result!.token}
        }
    }
    catch(error){
        return{
            statusCode:500,
            success:false,
            message:error
        }
    }
}

// delete token 
export const removeToken = async(token:string):Promise<DBresult>=>{
    try{
        const result = await Token.findOneAndDelete({ token:token});
        
        if(result ===null){
            return{
                statusCode:404,
                success:false,
                message:"could not find token with given token value."
            }
        }
        return {
            statusCode:200,
            success:true,
            message:{data:result}
        }
    }catch(error){
        return{
            statusCode:500,
            success:false,
            message:error
        }
    }
}