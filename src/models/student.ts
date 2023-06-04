import mongoose,{Schema} from "mongoose";

export interface student{
    studentId:string,
    name:string;
    email:string
    phoneNo:string

}


const studentSchema:Schema = new Schema({
    studentId:String,
    name:String,
    email:String,
    phoneNo:String
})


export const Student = mongoose.model<student>('student',studentSchema)


// schema for validation
export const studentValidationSchema = {
    'type':'object',
    'properties':{
        'studentId':{
            'type': 'string'
        },
        'name':{
            'type':'string'
        },
        'email':{
            'type':'string',
            'format':'email'
        },
		'phoneNo': {
			'type': 'string',
			'pattern': '^[0-9]{10}$'
		}

    },
    'required':[
        'name',
        'email',
        'phoneNo'
    ]
}

export const studentUpdateValidationSchema = {
    'type':'object',
    'properties':{
        'studentId':{
            'type': 'string'
        },
        'name':{
            'type':'string'
        },
        'email':{
            'type':'string',
            'format':'email'
        },
		'phoneNo': {
			'type': 'string',
			'pattern': '^[0-9]{10}$'
		}

    }
}