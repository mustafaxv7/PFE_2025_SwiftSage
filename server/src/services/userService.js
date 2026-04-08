import userRepository from '../repositories/userRepository.js';

class UserService {
    async getAllUsers() {
        return await userRepository.getAll();
    }

    async deleteUser(id) {
        await userRepository.delete(id);
    }

    async updateUser(id, userData) {
        await userRepository.update(id, userData);
    }
}

export default new UserService();
