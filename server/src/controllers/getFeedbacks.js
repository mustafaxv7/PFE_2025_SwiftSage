import feedbackService from '../services/feedbackService.js';

export const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await feedbackService.getAllFeedback();
        res.status(200).json({ feedbacks });
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Server error occurred.' });
    }
};
