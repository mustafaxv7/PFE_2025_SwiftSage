import feedbackService from './feedback.service.js';

export const sendFeedback = async (req, res, next) => {
    try {
        const { message, rating } = req.body;
        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }
        const feedbackId = await feedbackService.submitFeedback({
            userId: req.user.id,
            message,
            rating,
        });
        res.status(201).json({ message: 'Feedback submitted successfully', feedbackId });
    } catch (err) {
        next(err);
    }
};

export const getFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await feedbackService.getAllFeedback();
        res.status(200).json({ feedbacks });
    } catch (err) {
        next(err);
    }
};
