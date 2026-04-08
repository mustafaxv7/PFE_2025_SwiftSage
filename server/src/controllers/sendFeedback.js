import feedbackService from '../services/feedbackService.js';

export const sendFeedback = async (req, res) => {
    try {
        const { userId, message, rating } = req.body;
        if (!userId || !message) {
            return res.status(400).json({ error: 'User ID and message are required' });
        }

        const feedbackId = await feedbackService.submitFeedback({ userId, message, rating });
        res.status(201).json({ message: 'Feedback submitted successfully', feedbackId });
    } catch (err) {
        console.error('Error submitting feedback:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


