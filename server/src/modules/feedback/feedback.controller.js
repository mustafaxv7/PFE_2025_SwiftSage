import feedbackService from './feedback.service.js';

export const sendFeedback = async (req, res, next) => {
    try {
        const feedbackId = await feedbackService.submitFeedback(req.body);
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
