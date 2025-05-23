import con from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const getAlerts = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `
            SELECT * FROM alerts
            WHERE id = $1
        `;
        const values = [id];

        const result = await con.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Alert not found.' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
