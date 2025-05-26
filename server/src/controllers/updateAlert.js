import con from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const updateAlert = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: 'Alert ID is required' });
  }

  try {
    const updateQuery = `
      UPDATE alerts
      SET status = $1
      WHERE id = $2
      RETURNING id, status;
    `;

    const result = await con.query(updateQuery, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Alert not found.' });
    }

    res.status(200).json({
      message: 'Alert updated successfully',
      alert: result.rows[0]
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
