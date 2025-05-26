import con from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const sendAlert = async (req, res) => {
  let parsedReportData = {};

  try {
    if (!req.body.reportData) {
      return res.status(400).json({ error: 'Missing reportData field.' });
    }

    parsedReportData = JSON.parse(req.body.reportData);
  } catch (err) {
    console.error('Error parsing JSON:', err);
    return res.status(400).json({ error: 'Invalid JSON format.' });
  }

  try {
    const {
      message,
      description,
      date,          
      time,         
      status,
      importance,
      type,
      location,
      affectedArea,
      adminId        
    } = parsedReportData;

    if (!message || !date || !time || !status || !importance || !type || !location || !affectedArea || !adminId) {
      return res.status(400).json({ error: 'Missing one or more required fields.' });
    }

    // Changed to PostgreSQL syntax with parameterized queries
    const query = `
      INSERT INTO alerts (
        message,
        description,
        date,
        time,
        status,
        importance,
        type,
        location,
        affected_area,
        created_by_admin_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `;

    const values = [
      message,
      description || '',
      date,
      time,
      status,
      importance,
      type,
      location,
      affectedArea,
      adminId
    ];

    const result = await con.query(query, values);
    const alertId = result.rows[0].id;

    res.status(201).json({ 
      success: true, 
      message: 'Alert successfully created.',
      id: alertId
    });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
