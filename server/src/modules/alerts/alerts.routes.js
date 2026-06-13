import { Router } from 'express';
import { sendAlert, getAlerts, updateAlert, deleteAlert } from './alerts.controller.js';
import { authorizeAdmin } from '../../core/middleware/auth.js';

const router = Router();

router.post('/', authorizeAdmin, sendAlert);
router.patch('/:id', authorizeAdmin, updateAlert);
router.delete('/:id', authorizeAdmin, deleteAlert);
router.get('/:id', getAlerts);
router.get('/', authorizeAdmin, getAlerts);

export default router;
