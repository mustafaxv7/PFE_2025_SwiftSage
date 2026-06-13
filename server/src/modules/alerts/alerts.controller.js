import alertsService from './alerts.service.js';

export const sendAlert = async (req, res, next) => {
    try {
        let alertData = req.body;
        if (alertData.reportData) {
            try {
                alertData = typeof alertData.reportData === 'string'
                    ? JSON.parse(alertData.reportData)
                    : alertData.reportData;
            } catch {
                return res.status(400).json({ error: 'Invalid reportData JSON' });
            }
        }

        const { message, description, date, time, status, importance, type, location, affectedArea } = alertData;
        if (!message || !type || !location || !affectedArea) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const alertId = await alertsService.sendAlert({
            message,
            description: description || message,
            date: date || new Date().toISOString().split('T')[0],
            time: time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            status: status || 'active',
            importance: importance || 'medium',
            type,
            location,
            affectedArea,
            adminId: req.user?.id,
        });

        res.status(201).json({ message: 'Alert sent successfully', id: alertId });
    } catch (err) {
        next(err);
    }
};

export const getAlerts = async (req, res, next) => {
    try {
        if (req.params.id) {
            const alert = await alertsService.getAlertDetails(req.params.id);
            if (!alert) return res.status(404).json({ error: 'Alert not found' });
            return res.json(alert);
        }
        const alerts = await alertsService.getAllAlerts();
        res.json(alerts);
    } catch (err) {
        next(err);
    }
};

export const updateAlert = async (req, res, next) => {
    try {
        await alertsService.updateAlert(req.params.id, req.body);
        res.status(200).json({ message: 'Alert updated successfully' });
    } catch (err) {
        next(err);
    }
};

export const deleteAlert = async (req, res, next) => {
    try {
        await alertsService.removeAlert(req.params.id);
        res.status(200).json({ success: true, message: 'Alert deleted successfully' });
    } catch (err) {
        next(err);
    }
};
