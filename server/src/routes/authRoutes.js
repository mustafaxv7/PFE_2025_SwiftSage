import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import con from '../config/db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password, isOrganisationMember } = req.body;

        if (!name || !email || !phone|| !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users(username, email, phone_number, password, is_organization_member) VALUES($1, $2, $3, $4,$5);`;
        const values = [name, email, phone, hashedPassword, isOrganisationMember];

        try {
            await con.query(query, values);
            return res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            if (err.code === '23505') { 
                return res.status(400).json({ message: "User already exists" });
            }
            console.error(err.message);
            return res.status(500).json({ message: "Server error" });
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
});




router.post('/login', async (req, res) => {
     try {
         const { email, password } = req.body;
 
         if (!email || !password) {
             return res.status(400).json({ message: "Please fill all fields" });
         }
 
         const query = `SELECT * FROM users WHERE email = $1;`;
         const values = [email];
 
         const { rows } = await con.query(query, values);
 
         if (rows.length === 0) {
             return res.status(400).json({ message: "Invalid credentials" });
         }
 
         const user = rows[0];
 
         const validPassword = await bcrypt.compare(password, user.password);
         if (!validPassword) {
             return res.status(400).json({ message: "Invalid credentials" });
         }
 
         const token = jwt.sign(
             { id: user.id },
             process.env.JWT_SECRET,
             { expiresIn: '24h' }
         );
 
         return res.status(200).json({
               message: 'Login Successful',
               token 
          });
 
     } catch (err) {
         console.error(err);
         return res.status(500).json({ message: "Server error" });
     }
 });
 
export default router;