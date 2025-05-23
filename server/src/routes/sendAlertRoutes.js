import express from 'express';
import dotenv from 'dotenv';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { sendAlert } from '../controllers/sendAlert.js';    
import { getAlerts } from '../controllers/getAlerts.js';
dotenv.config();
const router = express.Router();
//for admin
router.post('/', authMiddleware, adminMiddleware, sendAlert); 

//for user
router.get('/:id', authMiddleware, getAlerts);
export default router;