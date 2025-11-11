import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "../config/config.js";

function connectDB(){
    mongoose.connect(config.MONGODB_URI)
    .then(()=>{
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log("error in connecting", err);
    })
}

export default connectDB;