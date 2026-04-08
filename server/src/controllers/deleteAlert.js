import alertService from '../services/alertService.js';

export const deleteAlert = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Alert ID is required' });

    try {
        await alertService.removeAlert(id);
        res.status(200).json({ success: true, message: 'Alert deleted successfully' });
    } catch (error) {
        console.error('Error deleting alert:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
