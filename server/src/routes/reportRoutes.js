import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addReport } from '../controllers/addReport.js';
import { switchStatus } from '../controllers/switchStatus.js';
import { editReport } from '../controllers/editReport.js';
import { getReportDetailsAdmin } from '../controllers/getReportDetailsAdmin.js';
import { getReportDetailsUser } from '../controllers/getReportDetailsUser.js';

import { getReports } from '../controllers/getReports.js';

const router = express.Router();

router.get('/', authMiddleware, getReports);
router.post('/', addReport);
router.get('/:id/user', authMiddleware, getReportDetailsUser); 
router.patch('/:id/edit', authMiddleware, editReport);
router.get('/:id', authMiddleware, getReportDetailsAdmin);
router.patch('/:id/status', authMiddleware, switchStatus);

export default router;