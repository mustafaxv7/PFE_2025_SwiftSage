import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard',authMiddleware, async (req, res) => {
     if(req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
     }
     res.status(200).json({ message: "Welcome to the admin dashboard" });

});

export default router;