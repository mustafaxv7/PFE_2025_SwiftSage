import alertsRepository from './alerts.repository.js';

class AlertsService {
    async sendAlert(alertData) {
        return await alertsRepository.create(alertData);
    }

    async getAllAlerts() {
        return await alertsRepository.findAll();
    }

    async getAlertDetails(id) {
        return await alertsRepository.findById(id);
    }

    async updateAlert(id, data) {
        await alertsRepository.update(id, data);
    }

    async removeAlert(id) {
        await alertsRepository.delete(id);
    }
}

export default new AlertsService();
