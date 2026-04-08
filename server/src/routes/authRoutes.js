import express from 'express';
import authService from '../services/authService.js';
import { registerSchema, loginSchema } from '../utils/userValidation.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Helper to set tokens in cookies
const setTokens = (res, accessToken, refreshToken) => {
    res.cookie('token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

router.post('/register', async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const userId = await authService.registerUser(value);
        return res.status(201).json({ message: "User registered successfully", userId });
    } catch (err) {
        if (err.code === '23505') {
            // PostgreSQL unique_violation error detail usually looks like: "Key (email)=(...) already exists."
            const match = err.detail.match(/\((.*?)\)/);
            const field = match ? match[1].replace(/_/g, ' ') : 'Record';
            const formattedField = field.charAt(0).toUpperCase() + field.slice(1);
            return res.status(400).json({ message: `${formattedField} already exists` });
        }
        console.error("Registration error:", err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await authService.login(value.email, value.password);
        
        const accessToken = authService.generateToken({ id: user.id, role: user.role });
        const refreshToken = authService.generateRefreshToken({ id: user.id, role: user.role });

        setTokens(res, accessToken, refreshToken);
        
        res.status(200).json({
            message: 'Login Successful',
            userRole: user.role
        });
    } catch (err) {
        if (err.message === 'Invalid credentials') {
            return res.status(400).json({ message: err.message });
        }
        console.error("Login error:", err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

router.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = authService.generateToken({ id: decoded.id, role: decoded.role });
        
        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });
        
        res.json({ message: "Token refreshed" });
    } catch (err) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.json({ message: "Logged out successfully" });
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const userData = await authService.getUserStatus(req.user.id, req.user.role);
        if (!userData) return res.status(404).json({ message: "User not found" });
        res.json(userData);
    } catch (err) {
        console.error("Auth check error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;