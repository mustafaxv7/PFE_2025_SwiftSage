import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import con from '../config/db.js';
import { registerSchema, loginSchema } from '../utils/userValidation.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper to set JWT cookie
const setAuthCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
};

router.post('/register', async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, email, phone, password, isOrganisationMember, community } = value;

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (username, email, phone_number, password, is_organization_member, community)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING user_id;
        `;

        const values = [name, email, phone, hashedPassword, isOrganisationMember || false, community];

        try {
            const result = await con.query(query, values);
            return res.status(201).json({ 
                message: "User registered successfully",
                user_id: result.rows[0].user_id 
            });
        } catch (err) {
            if (err.code === '23505') { 
                const field = err.detail.includes('email') ? 'Email' : err.detail.includes('username') ? 'Username' : 'User';
                return res.status(400).json({ message: `${field} already exists` });
            }
            console.error("Database error during registration:", err);
            return res.status(500).json({ message: "Registration failed due to a server error. Please check all fields (e.g. phone number length)." });
        }

    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = value;

        // Check if admin
        const adminResult = await con.query(`SELECT * FROM admins WHERE email = $1;`, [email]);
        if (adminResult.rows.length > 0) {
            const admin = adminResult.rows[0];
            const validPassword = await bcrypt.compare(password, admin.password);
            
            if (!validPassword) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: admin.admin_id, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            setAuthCookie(res, token);
            return res.status(200).json({
                message: 'Admin Login Successful',
                userRole: 'admin'
            });
        }

        // Check if regular user
        const userResult = await con.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = userResult.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.user_id, role: 'user' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        setAuthCookie(res, token);
        return res.status(200).json({
            message: 'Login Successful',
            userRole: 'user'
        });
        
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logged out successfully" });
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const { id, role } = req.user;
        let userData;

        if (role === 'admin') {
            const result = await con.query(`SELECT admin_id as id, email, 'admin' as role FROM admins WHERE admin_id = $1`, [id]);
            userData = result.rows[0];
        } else {
            const result = await con.query(`SELECT user_id as id, username as name, email, 'user' as role FROM users WHERE user_id = $1`, [id]);
            userData = result.rows[0];
        }

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(userData);
    } catch (err) {
        console.error("Auth check error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;