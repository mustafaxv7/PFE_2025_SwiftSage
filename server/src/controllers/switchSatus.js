import con from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();
export const switchStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Active', 'Resolved', 'Critical'];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    // Ensure the user is an admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Only admins can update report status' });
    }

    try {
        const updateQuery = `
        UPDATE reports
        SET status = $1
        WHERE id = $2
        RETURNING id, status;
        `;

        const result = await con.query(updateQuery, [status, id]);

        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Report not found' });
        }

        res.status(200).json({
        message: 'Report status updated successfully',
        report: result.rows[0],
        });
    } catch (err) {
        console.error('Error updating report status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};