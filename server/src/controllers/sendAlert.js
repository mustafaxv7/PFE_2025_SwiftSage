import con from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const sendAlert = async (req, res) => {
  let parsedReportData = {}, parsedReportDetailsData = {}, parsedAdditionalData = {};

  try {
    if (!req.body.reportData) {
      return res.status(400).json({ error: 'Missing reportData field.' });
    }

    parsedReportData = JSON.parse(req.body.reportData);

    if (req.body.reportDetailsData) {
      parsedReportDetailsData = JSON.parse(req.body.reportDetailsData);
    }

    if (req.body.additionalData) {
      parsedAdditionalData = JSON.parse(req.body.additionalData);
    }
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

    await con.promise().query(query, values);

    res.status(201).json({ success: true, message: 'Alert successfully created.' });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
