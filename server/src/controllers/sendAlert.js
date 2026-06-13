import alertService from '../services/alertService.js';

export const sendAlert = async (req, res) => {
    try {
        let alertData = req.body;

        // Handle redundant reportData format if present
        if (alertData.reportData) {
            try {
                alertData =
                    typeof alertData.reportData === 'string'
                        ? JSON.parse(alertData.reportData)
                        : alertData.reportData;
            } catch (e) {
                console.error('Error parsing reportData:', e);
            }
        }

        const {
            message,
            description,
            date,
            time,
            status,
            importance,
            type,
            location,
            affectedArea,
        } = alertData;

        if (!message || !type || !location || !affectedArea) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const alertId = await alertService.sendAlert({
            message,
            description: description || message,
            date: date || new Date().toISOString().split('T')[0],
            time:
                time ||
                new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }),
            status: status || 'active',
            importance: importance || 'medium',
            type,
            location,
            affectedArea,
            adminId: req.user?.id,
        });

        res.status(201).json({ message: 'Alert sent successfully', id: alertId });
    } catch (err) {
        console.error('Error sending alert:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
