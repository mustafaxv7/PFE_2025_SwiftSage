import express from 'express';
import {createAuthUser} from '../controllers/createAuthUser.js';
import { getAuthUsers } from '../controllers/getAuthUsers.js';
import { updateAuthUser } from '../controllers/updateAuthUser.js';
import { deleteAuthUser } from '../controllers/deleteAuthUser.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', authMiddleware, adminMiddleware, getAuthUsers);

router.post('/', authMiddleware, adminMiddleware, createAuthUser);

router.patch('/:id', authMiddleware, adminMiddleware, updateAuthUser);

router.delete('/:id', authMiddleware, adminMiddleware, deleteAuthUser);

export default router;