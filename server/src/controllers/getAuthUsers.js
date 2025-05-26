import con from "../config/db.js";

//testing

export const getAuthUsers = async (req, res) => {
    try {
        // Log the request to help with debugging
        console.log('Fetching users - auth check passed');
        
        const query = `
            SELECT 
                user_id, 
                username, 
                email, 
                phone_number, 
                is_organization_member,
                community,
                created_at
            FROM users
            ORDER BY created_at DESC;
        `;
        
        const result = await con.query(query);
        console.log(`Found ${result.rows.length} users`);
        
        // Return the raw data directly without transformation
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ message: "Server error: " + err.message });
    }
};
