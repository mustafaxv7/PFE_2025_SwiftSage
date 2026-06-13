import { Router } from 'express';
import { getAllUsers, deleteUser, updateUser } from './users.controller.js';
import { authorizeAdmin } from '../../core/middleware/auth.js';

const router = Router();

router.get('/', authorizeAdmin, getAllUsers);
router.delete('/:id', authorizeAdmin, deleteUser);
router.patch('/:id', authorizeAdmin, updateUser);

export default router;
