import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';

class AuthService {
    async registerUser(userData) {
        const { password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        return await userRepository.create({
            ...userData,
            password: hashedPassword,
        });
    }

    async login(email, password) {
        // Try Admin first
        const admin = await userRepository.findAdminByEmail(email);
        if (admin) {
            const isValid = await bcrypt.compare(password, admin.password);
            if (!isValid) throw new Error('Invalid credentials');

            return {
                id: admin.admin_id,
                role: 'admin',
            };
        }

        // Try regular User
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Invalid credentials');

        return {
            id: user.user_id,
            role: 'user',
        };
    }

    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    }

    async getUserStatus(id, role) {
        if (role === 'admin') {
            return await userRepository.findAdminById(id);
        }
        return await userRepository.findById(id);
    }
}

export default new AuthService();
