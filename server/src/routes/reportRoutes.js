import express from 'express';
import con from '../config/db.js';
import dotenv from 'dotenv';
import multer from 'multer';

const router = express.Router();
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/report/:id', upload.single('image'), async (req, res) => {
  const user_id = req.params.id;
  const { lat, lng, title, description, crisisType, categoryId } = req.body;

  if (!lat || !lng || !title || !description || !crisisType) {
    console.log(!lat || !lng || !title || !description || !crisisType);
    console.log(lat, lng, title, description, crisisType, categoryId);
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const reportInsertQuery = `
      INSERT INTO reports (
        title, description, crisis_type, category_id, user_id, location
      ) VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_MakePoint($6, $7), 4326))
      RETURNING id
    `;
    const reportValues = [
      title,
      description,
      crisisType,
      categoryId || null,
      user_id,
      lng,
      lat,
    ];
    const reportResult = await con.query(reportInsertQuery, reportValues);
    const reportId = reportResult.rows[0].id;

    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;
      const imageInsertQuery = `
        INSERT INTO images (filename, data, mimetype, report_id)
        VALUES ($1, $2, $3, $4)
      `;
      const imageValues = [originalname, buffer, mimetype, reportId];
      await con.query(imageInsertQuery, imageValues);
    }

    console.log(req.file);
    res.status(201).json({ message: "Report created successfully", reportId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/report', async (req, res) => {
  try {
    const result = await con.query('SELECT * FROM reports');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
