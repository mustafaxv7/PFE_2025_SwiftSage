import { Router } from 'express';
import { validate } from '../../core/middleware/validate.js';
import {
    addReport,
    getReports,
    getReportDetailsAdmin,
    getReportDetailsUser,
    editReport,
    switchStatus,
} from './reports.controller.js';
import { switchStatusSchema } from './reports.validation.js';

const router = Router();

router.get('/', getReports);
router.post('/', addReport);
router.get('/:id/user', getReportDetailsUser);
router.patch('/:id/edit', editReport);
router.get('/:id', getReportDetailsAdmin);
router.patch('/:id/status', validate(switchStatusSchema), switchStatus);

export default router;
