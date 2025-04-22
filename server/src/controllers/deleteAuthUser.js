import con from "../config/db.js";

export const deleteAuthUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Please provide a user ID" });
        }

        const query = `DELETE FROM users WHERE user_id = $1;`;
        const values = [id];

        try {
            await con.query(query, values);
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Server error" });
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
}