import { Router } from 'express';
import { register, login, refresh, logout, me } from './auth.controller.js';
import { authenticate } from '../../core/middleware/auth.js';
import { validate } from '../../core/middleware/validate.js';
import { registerSchema, loginSchema } from './auth.validation.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authenticate, me);

export default router;
