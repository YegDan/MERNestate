import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next)=>{
    
    const {username, email, password} = req.body
    const hashedPass = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password: hashedPass})
    
    try{
        await newUser.save()
        res.status(201).json("User created successfully")
    }catch(error){
        next(error)
    }
    
}

export const signin = async (req, res, next)=>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return errorHandler(404, "User not found")
        }
        if(!bcryptjs.compareSync(password, user.password)){
            res.status(401).json("Invalid credentials")
        }
        const {password: hashedPass, ...rest} = user._doc
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.cookie("token", token, {httpOnly: true, expires: new Date(Date.now() + 24*60*60*1000)})
        .status(200)
        .json(rest)
    }catch(error){
        next(error)
    }
}