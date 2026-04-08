import reportService from '../services/reportService.js';

export const getReportDetailsUser = async (req, res) => {
    try {
        const report = await reportService.getReportById(req.params.id);
        if (!report) return res.status(404).json({ error: 'Report not found.' });
        res.json(report);
    } catch (err) {
        console.error('Error fetching user report:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};