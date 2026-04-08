import alertService from '../services/alertService.js';

export const updateAlert = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Alert ID is required' });

    try {
        await alertService.updateAlert(id, req.body);
        res.status(200).json({ message: 'Alert updated successfully' });
    } catch (error) {
        console.error('Error updating alert:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
