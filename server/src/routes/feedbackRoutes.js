import express from 'express';
import dotenv from 'dotenv';
import {sendFeedback} from '../controllers/sendFeedback.js';
import { getFeedbacks } from '../controllers/getFeedbacks.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
dotenv.config();

const router = express.Router();


router.post('/', sendFeedback);

router.get('/', adminMiddleware, getFeedbacks); 

export default router;