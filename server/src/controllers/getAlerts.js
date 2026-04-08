import con from '../config/db.js';
import alertService from '../services/alertService.js';

export const getAlerts = async (req, res) => {
    try {
        if (req.params.id) {
            const alert = await alertService.getAlertDetails(req.params.id);
            if (!alert) return res.status(404).json({ error: 'Alert not found' });
            return res.json(alert);
        }

        const alerts = await alertService.getAllAlerts();
        res.json(alerts);
    } catch (err) {
        console.error('Error fetching alerts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
