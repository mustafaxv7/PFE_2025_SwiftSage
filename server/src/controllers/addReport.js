import upload from '../middleware/uploadMiddleware.js';
import uploadImageToSpaces from '../utils/uploadToS3.js';
import con from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

export const addReport = (upload.single('image'), async (req, res) =>{
    const { reportData, reportDetailsData, additionalData } = req.body;

    let parsedReportData, parsedReportDetailsData, parsedAdditionalData;
    try {
      parsedReportData = JSON.parse(reportData);
      parsedReportDetailsData = JSON.parse(reportDetailsData);
      parsedAdditionalData = JSON.parse(additionalData);
    } catch (err) {
      console.error('Error parsing JSON:', err);
      return res.status(400).json({ error: 'Invalid JSON format.' });
    }
  
    const {
      lat,
      lng,
      altitude,
      amplitude,
      title,
      description,
      crisisType,
      userId,
      status // new field
    } = parsedReportData;
  
    if (!lat || !lng || !title || !crisisType || !userId) {
      return res.status(400).json({ error: 'Latitude, Longitude, Title, Crisis Type, and User ID are required' });
    }
  
    try {
      let imageUrl = null;
  
      if (req.file) {
        const fileBuffer = req.file.buffer;
        const fileName = `reports/${Date.now()}_${req.file.originalname}`;
        imageUrl = await uploadImageToSpaces(fileBuffer, fileName, req.file.mimetype);
      }
  
      const insertQuery = `
        INSERT INTO reports (
          location,
          altitude,
          amplitude,
          title,
          description,
          crisis_type,
          image_url,
          user_id,
          status
        ) VALUES (
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
          $3, $4, $5, $6, $7, $8, $9, $10
        )
        RETURNING id;
      `;
  
      const insertValues = [
        parseFloat(lng),
        parseFloat(lat),
        altitude ? parseFloat(altitude) : null,
        amplitude ? parseFloat(amplitude) : null,
        title,
        description,
        crisisType,
        imageUrl,
        userId,
        status || 'Active'
      ];
  
      const result = await con.query(insertQuery, insertValues);
      const reportId = result.rows[0].id;
  
      // Insert report_details
      if (Object.keys(parsedReportDetailsData).length > 0) {
        const reportDetailsQuery = `
          INSERT INTO report_details (
            report_id,
            spread_rate,
            road_status,
            injured_number,
            bleeding_number,
            threatened_structures,
            containment_percent,
            burnt_area,
            institution_type,
            evacuated
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
          );
        `;
  
        const reportDetailsValues = [
          reportId,
          parsedReportDetailsData.spreadRate,
          parsedReportDetailsData.roadStatus,
          parsedReportDetailsData.injuredNumber,
          parsedReportDetailsData.bleedingNumber,
          parsedReportDetailsData.threatenedStructures,
          parsedReportDetailsData.containmentPercent,
          parsedReportDetailsData.burntArea,
          parsedReportDetailsData.institutionType,
          parsedReportDetailsData.evacuated
        ];
  
        await con.query(reportDetailsQuery, reportDetailsValues);
      }
  
      // Insert categories
      if (Object.keys(parsedAdditionalData).length > 0) {
        const categoriesQuery = `
          INSERT INTO categories (
            report_id,
            throttled,
            burnt,
            fractions,
            missing,
            trapped,
            submerged_dwelling,
            electrification,
            explosion
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9
          );
        `;
  
        const categoriesValues = [
          reportId,
          parsedAdditionalData.throttled,
          parsedAdditionalData.burnt,
          parsedAdditionalData.fractions,
          parsedAdditionalData.missing,
          parsedAdditionalData.trapped,
          parsedAdditionalData.submergedDwelling,
          parsedAdditionalData.electrification,
          parsedAdditionalData.explosion
        ];
  
        await con.query(categoriesQuery, categoriesValues);
      }
  
      res.status(201).json({ message: 'Report created successfully', reportId });
  
    } catch (err) {
      console.error('Error inserting report:', err);
      res.status(500).json({ error: 'Internal server error.' });
    }
});



