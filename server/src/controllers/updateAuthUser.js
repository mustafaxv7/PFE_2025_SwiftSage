import userService from '../services/userService.js';

export const updateAuthUser = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'User ID is required' });

    try {
        await userService.updateUser(id, req.body);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
