import reportsService from './reports.service.js';

export const addReport = async (req, res, next) => {
    try {
        if (!req.body.reportData) {
            return res.status(400).json({ error: 'Missing reportData field.' });
        }

        const reportData = JSON.parse(req.body.reportData);
        const details = req.body.reportDetailsData ? JSON.parse(req.body.reportDetailsData) : {};
        const additionalData = req.body.additionalData ? JSON.parse(req.body.additionalData) : {};

        const { lat, lng, title, crisisType, userId } = reportData;
        if (!lat || !lng || !title || !crisisType || !userId) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const reportId = await reportsService.createReport(reportData, details, additionalData);
        res.status(201).json({ message: 'Report created successfully', reportId });
    } catch (err) {
        next(err);
    }
};

export const getReports = async (req, res, next) => {
    try {
        const reports = await reportsService.getAllReports();
        res.status(200).json(reports);
    } catch (err) {
        next(err);
    }
};

export const getReportDetailsAdmin = async (req, res, next) => {
    try {
        const report = await reportsService.getReportById(req.params.id);
        if (!report) return res.status(404).json({ error: 'Report not found.' });
        res.json(report);
    } catch (err) {
        next(err);
    }
};

export const getReportDetailsUser = async (req, res, next) => {
    try {
        const report = await reportsService.getReportById(req.params.id);
        if (!report) return res.status(404).json({ error: 'Report not found.' });
        res.json(report);
    } catch (err) {
        next(err);
    }
};

export const editReport = async (req, res, next) => {
    try {
        await reportsService.editReport(
            req.params.id,
            req.user.id,
            req.body.description,
            req.body.reportDetailsData
        );
        res.status(200).json({ message: 'Report updated successfully.' });
    } catch (err) {
        if (err.message === 'Unauthorized or report not found') {
            return res.status(403).json({ error: err.message });
        }
        next(err);
    }
};

export const switchStatus = async (req, res, next) => {
    try {
        await reportsService.updateReportStatus(req.params.id, req.body.status);
        res.status(200).json({ message: 'Report status updated successfully' });
    } catch (err) {
        next(err);
    }
};
