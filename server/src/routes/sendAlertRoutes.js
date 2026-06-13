import express from 'express';
import { adminMiddleware } from '../middleware/authMiddleware.js';
import { sendAlert } from '../controllers/sendAlert.js';
import { getAlerts } from '../controllers/getAlerts.js';
import { updateAlert } from '../controllers/updateAlert.js';
import { deleteAlert } from '../controllers/deleteAlert.js';
const router = express.Router();

// authMiddleware is already applied at the server level for /api/alerts
router.post('/', adminMiddleware, sendAlert);
router.patch('/:id', adminMiddleware, updateAlert);
router.delete('/:id', adminMiddleware, deleteAlert);

router.get('/:id', getAlerts);
router.get('/', adminMiddleware, getAlerts);

export default router;
