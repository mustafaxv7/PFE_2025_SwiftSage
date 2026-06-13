import reportService from '../services/reportService.js';

export const editReport = async (req, res) => {
    const { id } = req.params;
    const { description, reportDetailsData } = req.body;

    try {
        await reportService.editReport(id, req.user.id, description, reportDetailsData);
        res.status(200).json({ message: 'Report updated successfully.' });
    } catch (err) {
        if (err.message === 'Unauthorized or report not found') {
            return res.status(403).json({ error: err.message });
        }
        console.error('Error updating report:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
