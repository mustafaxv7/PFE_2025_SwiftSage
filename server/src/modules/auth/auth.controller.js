import authService from './auth.service.js';
import jwt from 'jsonwebtoken';

const setTokens = (res, accessToken, refreshToken) => {
    const cookieOpts = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    };
    res.cookie('token', accessToken, { ...cookieOpts, maxAge: 60 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 });
};

export const register = async (req, res, next) => {
    try {
        const userId = await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (err) {
        if (err.code === '23505') {
            const match = err.detail.match(/\((.*?)\)/);
            const field = match ? match[1].replace(/_/g, ' ') : 'Record';
            return res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` });
        }
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await authService.login(req.body.email, req.body.password);
        const accessToken = authService.generateToken({ id: user.id, role: user.role });
        const refreshToken = authService.generateRefreshToken({ id: user.id, role: user.role });
        setTokens(res, accessToken, refreshToken);
        res.status(200).json({ message: 'Login Successful', userRole: user.role });
    } catch (err) {
        if (err.message === 'Invalid credentials') {
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
};

export const refresh = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = authService.generateToken({ id: decoded.id, role: decoded.role });
        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000,
        });
        res.json({ message: 'Token refreshed' });
    } catch {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};

export const me = async (req, res, next) => {
    try {
        const userData = await authService.getUserStatus(req.user.id, req.user.role);
        if (!userData) return res.status(404).json({ message: 'User not found' });
        res.json(userData);
    } catch (err) {
        next(err);
    }
};
