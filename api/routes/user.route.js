import express, { Router } from 'express';
import User from '../models/user.model.js';
import { get_all_users } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/', get_all_users)

export default router;
