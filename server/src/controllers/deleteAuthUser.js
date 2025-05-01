import con from "../config/db.js";

export const deleteAuthUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Please provide a user ID" });
        }

        const query = `DELETE FROM users WHERE user_id = $1 RETURNING *;`;
        const values = [id];

        const result = await con.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });

    } catch (err) {
        console.error("Error deleting user:", err.message);
        return res.status(500).json({ message: "Server error" });
    }
};
