import con from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const sendFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const sql = 'INSERT INTO feedback (name, email, message, created_at) VALUES (?, ?, ?, NOW())';
    const values = [name, email, message];

    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error.' });
      }

      return res.status(200).json({ success: 'Message sent successfully!' });
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};
