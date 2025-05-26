import con from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();
export const editReport = async (req, res) => {
    const { id } = req.params;
    const { description, reportDetailsData } = req.body;

    if (!description && !reportDetailsData) {
        return res.status(400).json({ error: 'Nothing to update.' });
    }

    try {
        const reportCheck = await con.query(
        `SELECT id FROM reports WHERE id = $1 AND user_id = $2`,
        [id, req.user.id]
        );

        if (reportCheck.rows.length === 0) {
        return res.status(403).json({ error: 'Unauthorized or report not found.' });
        }

        if (description) {
        await con.query(
            `UPDATE reports SET description = $1 WHERE id = $2`,
            [description, id]
        );
        }

        const allowedFields = [
        "spread_rate",
        "road_status",
        "injured_number",
        "bleeding_number",
        "threatened_structures",
        "containment_percent",
        "burnt_area",
        "institution_type",
        "evacuated"
        ];

        if (reportDetailsData && typeof reportDetailsData === 'object') {
        const updates = [];
        const values = [];
        let paramIndex = 1;

        for (const field of allowedFields) {
            if (field in reportDetailsData) {
            updates.push(`${field} = $${paramIndex++}`);
            values.push(reportDetailsData[field]);
            }
        }

        if (updates.length > 0) {
            values.push(id); 
            const query = `
            UPDATE report_details
            SET ${updates.join(', ')}
            WHERE report_id = $${paramIndex}
            `;
            await con.query(query, values);
        }
        }

        res.status(200).json({ message: 'Report updated successfully.' });

    } catch (err) {
        console.error('Error updating report:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};