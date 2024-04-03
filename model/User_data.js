import mongoose from "mongoose";
const User_dataSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    pic:{type:String}
})
const user_data=mongoose.model('user_data',User_dataSchema);
export default user_data;