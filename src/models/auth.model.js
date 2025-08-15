import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:"string",
        require:true,
        unique:true,
    },
    password:{
        type:"string",
        require:true,
        unique:true
    }
})

const userModel = new mongoose.model('user',userSchema)
export default userModel;