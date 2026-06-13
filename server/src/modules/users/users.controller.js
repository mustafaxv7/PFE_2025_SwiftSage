import usersService from './users.service.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await usersService.deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        await usersService.updateUser(req.params.id, req.body);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        next(err);
    }
};
