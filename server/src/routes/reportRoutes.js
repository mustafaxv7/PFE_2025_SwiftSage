import express from 'express';
import dotenv from 'dotenv';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { addReport } from '../controllers/addReport.js';
import { switchStatus } from '../controllers/switchSatus.js';
import { editReport } from '../controllers/editReport.js';
import e from 'express';
dotenv.config();

const router = express.Router();

router.post('/', addReport);

router.patch('/:id/edit', authMiddleware,editReport);

router.patch('/:id/status', authMiddleware,adminMiddleware,switchStatus);


export default router;