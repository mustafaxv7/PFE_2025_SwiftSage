import reportService from '../services/reportService.js';

export const addReport = async (req, res) => {
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

        const reportId = await reportService.createReport(reportData, details, additionalData);
        res.status(201).json({ message: 'Report created successfully', reportId });

    } catch (err) {
        console.error('Error adding report:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
