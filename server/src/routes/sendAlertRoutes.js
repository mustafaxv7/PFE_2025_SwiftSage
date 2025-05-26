import express from 'express';
import dotenv from 'dotenv';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { sendAlert } from '../controllers/sendAlert.js';    
import { getAlerts } from '../controllers/getAlerts.js';
import { updateAlert } from '../controllers/updateAlert.js';
import { deleteAlert } from '../controllers/deleteAlert.js';

dotenv.config();
const router = express.Router();

// For admin
router.post('/', authMiddleware, adminMiddleware, sendAlert);
router.put('/:id', authMiddleware, adminMiddleware, updateAlert);
router.delete('/:id', authMiddleware, adminMiddleware, deleteAlert); 

// For user
router.get('/:id', authMiddleware, getAlerts);
router.get('/', authMiddleware, adminMiddleware, getAlerts);

export default router;