import mongoose,{Schema} from "mongoose";

export interface user{
    username:string,
    passward:string
    droneIds:string[]
}

const userSchema = new Schema({
    username:String,
    password:String,
    droneIds: {
        type:[String],
        default: []
    },
})

export const User = mongoose.model<user>('user',userSchema);
