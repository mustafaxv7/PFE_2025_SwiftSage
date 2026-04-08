import userService from '../services/userService.js';

export const deleteAuthUser = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "User ID is required" });

    try {
        await userService.deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Server error" });
    }
};
