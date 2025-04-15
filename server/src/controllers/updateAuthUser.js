import con from "../config/db.js"
export const updateAuthUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, password, isOrganisationMember } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `UPDATE users SET username = $1, email = $2, phone_number = $3, password = $4, is_organization_member = $5 WHERE user_id = $6;`;
        const values = [name, email, phone, hashedPassword, isOrganisationMember, id];

        try {
            await con.query(query, values);
            return res.status(200).json({ message: "User updated successfully" });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Server error" });
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
};