import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
    res.status(200).json({ message: "Welcome to the admin dashboard" });
});

export default router;