

import con from "../config/db.js";
import bcrypt from "bcrypt";

export const createAuthUser = async (req, res) => {
    try {
        const { name, email, phone, password, isOrganisationMember, community, orgType } = req.body;

        if (!name || !email || !phone || !password || !community) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }
        const checkQuery = `
            SELECT user_id FROM users WHERE email = $1;
        `;
        
        const checkResult = await con.query(checkQuery, [email]);
        
        if (checkResult.rows.length > 0) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (
                username, 
                email, 
                phone_number, 
                password, 
                is_organization_member, 
                community
            ) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING user_id;
        `;

        const values = [
            name,
            email,
            phone,
            hashedPassword,
            isOrganisationMember || false,
            community
        ];

        const result = await con.query(query, values);

        return res.status(201).json({
            message: "User created successfully",
            user_id: result.rows[0].user_id
        });
    } catch (err) {
        console.error('Error creating user:', err);
        if (err.code === '23505') {
            
            console.error('Constraint violation:', err.constraint);
            return res.status(400).json({ 
                message: "User already exists", 
                details: `Constraint violated: ${err.constraint}` 
            });
        }
        
        return res.status(500).json({ message: "Server error" });
    }
};
