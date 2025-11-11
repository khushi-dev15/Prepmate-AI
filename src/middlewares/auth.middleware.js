import jwt from "jsonwebtoken";
import userModel from "../models/user.model";

export const protect = async (req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token){
            return res.status(401).json({message:"No authorized access"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await user.findById(decoded.id).select("-password")

        next();
    }
    catch (error){
        console.error("Error in auth middleware:", error);
        return res.status(401).json({
            message:"No authorized access"
        })
    }
};