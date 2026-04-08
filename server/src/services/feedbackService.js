import feedbackRepository from '../repositories/feedbackRepository.js';

class FeedbackService {
    async submitFeedback(data) {
        return await feedbackRepository.create(data);
    }

    async getAllFeedback() {
        return await feedbackRepository.findAll();
    }
}

export default new FeedbackService();
