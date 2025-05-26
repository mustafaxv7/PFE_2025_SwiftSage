import con from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const getFeedbacks = async (req, res) => {
  try {
    const sql = 'SELECT id, name, email, message, created_at FROM feedback ORDER BY created_at DESC';

    con.query(sql, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to retrieve feedbacks.' });
      }

      return res.status(200).json({ feedbacks: results });
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error occurred.' });
  }
};

