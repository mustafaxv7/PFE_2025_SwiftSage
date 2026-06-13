import feedbackRepository from './feedback.repository.js';

class FeedbackService {
    async submitFeedback(data) {
        return await feedbackRepository.create(data);
    }

    async getAllFeedback() {
        return await feedbackRepository.findAll();
    }
}

export default new FeedbackService();
