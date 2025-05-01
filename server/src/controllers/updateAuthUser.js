import con from "../config/db.js";
import bcrypt from "bcrypt";

export const updateAuthUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, password, isOrganisationMember, community} = req.body;

        if (!name || !email || !phone || !community) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const query = `
            UPDATE users 
            SET 
                username = $1, 
                email = $2, 
                phone_number = $3, 
                ${hashedPassword ? 'password = $4,' : ''} 
                is_organization_member = $5,
                community = $6
            WHERE user_id = $7;
        `;

        const values = hashedPassword
            ? [name, email, phone, hashedPassword, isOrganisationMember,community, id]
            : [name, email, phone, isOrganisationMember,community, id];

        await con.query(query, values);

        return res.status(200).json({ message: "User updated successfully" });

    } catch (err) {
        console.error("Error updating user:", err.message);
        return res.status(500).json({ message: "Server error" });
    }
};
