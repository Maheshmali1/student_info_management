import mongoose,{Schema} from "mongoose";

export interface token{
    token:string;
}

const tokenSchema = new Schema({
    token:String
});

export const Token = mongoose.model<token>('token',tokenSchema);

