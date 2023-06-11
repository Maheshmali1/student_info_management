import { DBresult,User } from "../models"


export const saveUser = async(userData:any):Promise<DBresult>=>{
    const newUser = new User(userData);
    try {
        await newUser.save();
        return {
            statusCode:201,
            success: true,
            message: "User added successfully."
        };
    } catch (error) {
        return {
            statusCode:500,
            success: false,
            message: error
        };
    }
}

export const findByNameUser = async(username:string):Promise<DBresult>=>{
    
    try {
        const foundUser = await User.findOne({username:username});

        if(foundUser===null){
            return {
                statusCode:404,
                success:false,
                message:"could not find User with given username."
            };
        }
        return {
            statusCode:200,
            success: true,
            message: {data:foundUser}
        };
    } catch (error) {
        return {
            statusCode:500,
            success: false,
            message: error
        };
    }
}
