import { Student, DBresult } from "../models";

// Adding student to database.
export const add = async function(studentData:any):Promise<DBresult>{
    const newStudent = new Student(studentData);
    try {
        await newStudent.save();
        return {
            success: true,
            message: "student added successfully."
        };
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
}

// Finding the student with given studentId.
export const findById = async (id:string):Promise<DBresult>=>{
    try {
        const foundStudent = await Student.findOne({ studentId: id });
        if(foundStudent===null){
            return {
                success:false,
                message:"could not find studnet with given studentId."
            }
        }
        return {
            success: true,
            message: {data:foundStudent}
        };
    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
}

// Getting all present students in the system.
export const getAll = async():Promise<DBresult>=>{
    try{
        const foundStudents = await Student.find({});
        return{
            success:true,
            message:{data:foundStudents }
        }
    }
    catch(error){
        return{
            success:false,
            message:error
        }
    }
}

// Updating the particular student by studentId
export const update = async(id:string,updateData:any):Promise<DBresult>=>{

    try{
        const updatedData = await Student.findOneAndUpdate(
            {studentId:id },
            { $set: updateData },
            { returnOriginal: false } 
        );
        if(updatedData===null){
            return{
                success:false,
                message:"could not find student with given studentId."
            }
        }
        return{
            success:true,
            message:{data:updatedData}
        }
    }
    catch(error){
        return{
            success:false,
            message:error
        }
    }
    
}

// deleting the particular student given by studentId.
export const remove = async(id:string):Promise<DBresult>=>{
    try{
        const result = await Student.findOneAndDelete({ studentId:id});
        
        if(result ===null){
            return{
                success:false,
                message:"could not find student with given studentId."
            }
        }
        return {
            success:true,
            message:{data:result}
        }
    }catch(error){
        return{
            success:false,
            message:error
        }
    }
}
