import reportService from '../services/reportService.js';

export const switchStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Active', 'Resolved', 'Critical'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    try {
        await reportService.updateReportStatus(id, status);
        res.status(200).json({ message: 'Report status updated successfully' });
    } catch (err) {
        console.error('Error updating report status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
