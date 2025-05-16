// EXPLANATION ONLY - NO CODE CHANGES
/*
Changes made to createAuthUser.js:

1. Added explicit user existence check:
   - Added a separate SELECT query to check if user exists before attempting insertion
   - This prevents constraint violations and provides clearer error messages to the client

2. Enhanced error handling:
   - Added specific handling for SQL constraint violations (error code '23505')
   - Now identifies which specific constraint was violated (e.g., unique email)
   - More informative error responses make debugging and client-side handling easier

3. Improved validation:
   - Now checks for all required fields at the beginning of the function
   - Returns appropriate status codes (400 for client errors, 500 for server errors)

4. Better return structure:
   - Returns the created user_id to the client for further operations
   - Returns standardized message format for consistency across API
*/

import con from "../config/db.js";
import bcrypt from "bcrypt";

//testing

export const createAuthUser = async (req, res) => {
    try {
        const { name, email, phone, password, isOrganisationMember, community, orgType } = req.body;

        if (!name || !email || !phone || !password || !community) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        // First check if the user already exists
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
        
        // More detailed error handling
        if (err.code === '23505') {
            // Log the constraint that was violated
            console.error('Constraint violation:', err.constraint);
            return res.status(400).json({ 
                message: "User already exists", 
                details: `Constraint violated: ${err.constraint}` 
            });
        }
        
        return res.status(500).json({ message: "Server error" });
    }
};
