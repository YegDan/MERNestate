import express, { Router } from 'express';
import User from '../model/user.model.js';
const router = express.Router();

router.get('/', (req, res)=>{
    let users = User.find().then((users)=>{
        res.json(users);
    })
})

export default router;
