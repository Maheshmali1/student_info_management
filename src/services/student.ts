import { Student, DBresult } from "../models";

// Adding student to database.
export const saveStudent = async function(studentData:any):Promise<DBresult>{
    const newStudent = new Student(studentData);
    try {
        await newStudent.save();
        return {
            statusCode:201,
            success: true,
            message: "student added successfully."
        };
    } catch (error) {
        return {
            statusCode:500,
            success: false,
            message: error
        };
    }
}

// Finding the student with given studentId.
export const findByIdStudent = async (id:number):Promise<DBresult>=>{
    try {
        const foundStudent = await Student.findOne({ studentId: id });
        if(foundStudent===null){
            return {
                statusCode:404,
                success:false,
                message:"could not find studnet with given studentId."
            }
        }
        return {
            statusCode:200,
            success: true,
            message: {data:foundStudent}
        };
    } catch (error) {
        return {
            statusCode:500,
            success: false,
            message: error
        };
    }
}

// Getting all present students in the system.
export const findAllStudent = async():Promise<DBresult>=>{
    try{
        const foundStudents = await Student.find({});
        return{
            statusCode:200,
            success:true,
            message:{data:foundStudents }
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

// Updating the particular student by studentId
export const updateStudent = async(id:number,updateData:any):Promise<DBresult>=>{

    try{
        const updatedData = await Student.findOneAndUpdate(
            {studentId:id },
            { $set: updateData },
            { returnOriginal: false } 
        );
        if(updatedData===null){
            return{
                statusCode:404,
                success:false,
                message:"could not find student with given studentId."
            }
        }
        return{
            statusCode:204,
            success:true,
            message:{data:updatedData}
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

// deleting the particular student given by studentId.
export const removeStudent = async(id:number):Promise<DBresult>=>{
    try{
        const result = await Student.findOneAndDelete({ studentId:id});
        
        if(result ===null){
            return{
                statusCode:404,
                success:false,
                message:"could not find student with given studentId."
            }
        }
        return {
            statusCode:204,
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
