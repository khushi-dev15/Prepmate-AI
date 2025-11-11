import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validateBeforeSave:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        minlength:6
    },

})

const userModel = mongoose.model("user", userschema);

export default userModel;