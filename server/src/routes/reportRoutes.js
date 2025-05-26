import express from 'express';
import dotenv from 'dotenv';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { addReport } from '../controllers/addReport.js';
import { switchStatus } from '../controllers/switchSatus.js';
import { editReport } from '../controllers/editReport.js';
import { getReportDetailsAdmin } from '../controllers/getReportDetailsAdmin.js';
import { getReportDetailsUser } from '../controllers/getReportDetailsUser.js';
import e from 'express';
dotenv.config();

const router = express.Router();

router.post('/', addReport);

router.get('/:id/user', authMiddleware, getReportDetailsUser); 

router.patch('/:id/edit', authMiddleware,editReport);

router.get('/:id', authMiddleware, adminMiddleware, getReportDetailsAdmin);

router.patch('/:id/status', authMiddleware,adminMiddleware,switchStatus);


export default router;