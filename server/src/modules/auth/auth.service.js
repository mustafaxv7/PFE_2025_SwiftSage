import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authRepository from './auth.repository.js';

class AuthService {
    async registerUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await authRepository.createUser({
            ...userData,
            password: hashedPassword,
        });
    }

    async login(email, password) {
        const admin = await authRepository.findAdminByEmail(email);
        if (admin) {
            const isValid = await bcrypt.compare(password, admin.password);
            if (!isValid) throw new Error('Invalid credentials');
            return { id: admin.admin_id, role: 'admin' };
        }

        const user = await authRepository.findUserByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Invalid credentials');

        return { id: user.user_id, role: 'user' };
    }

    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    }

    async getUserStatus(id, role) {
        if (role === 'admin') {
            return await authRepository.findAdminById(id);
        }
        return await authRepository.findUserById(id);
    }
}

export default new AuthService();
