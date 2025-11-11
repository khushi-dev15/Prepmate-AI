import bcrypt from "bcryptjs";
import { createUser,findOneUser,findUser } from "../dao/user.dao.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function registerController(req,res){
    const {username, email, Password} = req.body;
    const isUserExist = await findOneUser ({
        $or:[
       { email:email,},
       { username:username}
        ]
    })
    if(isUserExist){
        return res.status(400).json({
            message:"user already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(Password,10);
const user = await createUser({
    username,
    email,
    Password: hashedPassword
})
const token = jwt.sign({id:user._id},config.JWT_SECRET)
res.cookie("token", token)

return res.status(201).json({
    message: "user registered successfully",
    user:{
        username : user.username,
        email:user.email,
        token:token
    }
})
}

export async function loginController(req,res){
    const {email,Password,username}  = req.body;
    const user = await findOneUser({
        $or:[
            {email},
            {username}
        ]
    })
    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(Password,user.Password)
    if(!isPasswordValid){
        return res.status(400).json({
            message :"invalid Credentials"
        })
    }

    const token = jwt.sign({_id:user._id}, config.JWT_SECRET)

    res.cookie("token",token)

    return res.status(200).json({
        message:"login successfull",
        user:{
            username:user.username,
            email:user.email,

        }
    })

}