import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import con from '../config/db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password, isOrganisationMember, community } = req.body;

        if (!name || !email || !phone || !password || !community) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (username, email, phone_number, password, is_organization_member, community)
            VALUES ($1, $2, $3, $4, $5, $6);
        `;

        const values = [name, email, phone, hashedPassword, isOrganisationMember, community];

        try {
            await con.query(query, values);
            return res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            if (err.code === '23505') { 
                return res.status(400).json({ message: "User already exists" });
            }
            console.error("Database error:", err.message);
            return res.status(500).json({ message: "Server error" });
        }

    } catch (err) {
        console.error("Registration error:", err.message);
        return res.status(500).json({ message: "Server error" });
    }
});




router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        let userRole = "user"; // default role

        // check if the user is an admin 
        const adminQuery = `SELECT * FROM admins WHERE email = $1;`;
        const adminValues = [email];
        const adminResult = await con.query(adminQuery, adminValues);

        if (adminResult.rows.length > 0) {
            const admin = adminResult.rows[0];

            // verify password for admin
            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            userRole = "admin";
            const token = jwt.sign(
                { id: admin.admin_id, role: userRole },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
                console.log(token);
            return res.status(200).json({
                message: 'Admin Login Successful',
                token,
                userRole
            });
        }

        // if not an admin check inside users table
        const userQuery = `SELECT * FROM users WHERE email = $1;`;
        const userValues = [email];
        const userResult = await con.query(userQuery, userValues);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = userResult.rows[0];

        // verify password for normal user
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.user_id, role: userRole },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: 'Login Successful',
            token,
            userRole
        });
        
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({ message: "Server error" });
    }
});

export default router;