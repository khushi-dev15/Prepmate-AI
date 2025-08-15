import userModel from "../models/auth.model.js";
import routes from "../routes/auth.routes.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function registerController(req,res) {
    const {username,email,password} = req.body;
    const isUserExist = await userModel.findOneuser({
        $or:[{
            username:username
        },
    {
        email:email
    },
    {
        password:passsword
    }]
    });
    if (isUserExist){
        return res.status(400).json({
            message:"user already exist"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const user = await createUser({
        username:username,
        email:email,
        password:hashedPassword
    })
    const token = jwt.sign({_id:user._id},confi)
}