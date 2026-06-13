import usersRepository from './users.repository.js';

class UsersService {
    async getAllUsers() {
        return await usersRepository.findAll();
    }

    async deleteUser(id) {
        await usersRepository.delete(id);
    }

    async updateUser(id, userData) {
        await usersRepository.update(id, userData);
    }
}

export default new UsersService();
