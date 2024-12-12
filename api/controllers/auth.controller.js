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
            return next(errorHandler(404, "User not found"))
        }
        if(!bcryptjs.compareSync(password, user.password)){
            return next(errorHandler(401, "Invalid credentials"))
        }
        const {password: hashedPass, ...rest} = user._doc
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.cookie("token", token, {httpOnly: true})
        .status(200)
        .json(rest)
    }catch(error){
        next(error)
    }
}

export const google = async(req, res, next)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(user){
            const {password, ...rest} = user._doc
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.cookie("token", token, {httpOnly: true})
            .status(200)
            .json(rest)
        }else{
            const generatedPass = Math.random().toString(36).slice(-8)  + Math.random().toString(36).slice(-8)
            const hashedPass = bcryptjs.hashSync(generatedPass, 10)
            const username = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
            const newUser = new User({username, email: req.body.email, password: hashedPass, avatar: req.body.photo})
            await newUser.save()
            const {password, ...rest} = newUser
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
            res.cookie("token", token, {httpOnly: true})
            .status(201)
            .json(rest)
        } 
    }catch{
        next(error)
    }
}