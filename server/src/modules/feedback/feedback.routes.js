import { Router } from 'express';
import { sendFeedback, getFeedbacks } from './feedback.controller.js';
import { validate } from '../../core/middleware/validate.js';
import { sendFeedbackSchema } from './feedback.validation.js';
import { authorizeAdmin } from '../../core/middleware/auth.js';

const router = Router();

router.post('/', validate(sendFeedbackSchema), sendFeedback);
router.get('/', authorizeAdmin, getFeedbacks);

export default router;
