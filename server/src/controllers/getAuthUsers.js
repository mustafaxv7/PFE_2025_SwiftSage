import con from "../config/db.js";

export const getAuthUsers = async (req, res) => {
    try {
        const query = `
            SELECT 
                user_id, 
                username, 
                email, 
                phone_number, 
                password,
                is_organization_member,
                community,
                created_at
            FROM users;
        `;
        const result = await con.query(query);
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        return res.status(500).json({ message: "Server error" });
    }
};
