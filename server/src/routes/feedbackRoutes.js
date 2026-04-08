import express from 'express';
import { sendFeedback } from '../controllers/sendFeedback.js';
import { getFeedbacks } from '../controllers/getFeedbacks.js';
import { adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', sendFeedback);

router.get('/', adminMiddleware, getFeedbacks); 

export default router;