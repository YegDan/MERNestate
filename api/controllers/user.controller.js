import User from "../models/user.model.js";

export const get_all_users = (req, res)=>{
    const users = User.find().then((users)=>{
        res.json(users)
    });
}