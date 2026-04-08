import alertRepository from '../repositories/alertRepository.js';

class AlertService {
    async sendAlert(alertData) {
        return await alertRepository.create(alertData);
    }

    async getAllAlerts() {
        return await alertRepository.findAll();
    }

    async getAlertDetails(id) {
        return await alertRepository.findById(id);
    }

    async updateAlert(id, data) {
        await alertRepository.update(id, data);
    }

    async removeAlert(id) {
        await alertRepository.delete(id);
    }
}

export default new AlertService();
