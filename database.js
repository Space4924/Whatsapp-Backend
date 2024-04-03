import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const url=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@web.ujpvkbx.mongodb.net/`;

const Connection =async()=>{
    try{
        await mongoose.connect(url);
        console.log("Databse Connected Succesfully");
    }catch(err){
        console.log("Error While Connecting in Mongodb",err.message);
    }
}
export default Connection;