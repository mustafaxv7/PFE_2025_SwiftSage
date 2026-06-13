import authService from '../services/authService.js';

export const createAuthUser = async (req, res) => {
    try {
        const userId = await authService.registerUser(req.body);
        res.status(201).json({ message: 'User created successfully', user_id: userId });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(400).json({ message: err.message || 'Server error' });
    }
};
