import con from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const getAlerts = async (req, res) => {
    const { id } = req.params;

    try {
        // If an ID is provided, fetch a specific alert
        if (id) {
            const query = `
                SELECT id, message, description, date, time, status, importance, 
                type, location, affected_area, created_at, created_by_admin_id
                FROM alerts
                WHERE id = $1
            `;
            const values = [id];

            const result = await con.query(query, values);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Alert not found.' });
            }

            res.status(200).json(result.rows[0]);
        } 
        // Otherwise, fetch all alerts (for admin) or community-specific alerts (for users)
        else {
            const isAdmin = req.user?.role === 'admin';
            let query;
            let values = [];

            if (isAdmin) {
                // Admins can see all alerts
                query = `
                    SELECT id, message, description, date, time, status, importance, 
                    type, location, affected_area, created_at, created_by_admin_id
                    FROM alerts
                    ORDER BY created_at DESC
                `;
            } else {
                // Regular users only see alerts for their community
                query = `
                    SELECT id, message, description, date, time, status, importance, 
                    type, location, affected_area, created_at, created_by_admin_id
                    FROM alerts
                    WHERE affected_area = $1 OR affected_area = 'Toutes les communes'
                    ORDER BY created_at DESC
                `;
                values = [req.user.community];
            }

            const result = await con.query(query, values);
            res.status(200).json(result.rows);
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
