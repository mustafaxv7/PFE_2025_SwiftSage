import con from '../config/db.js';

export const getReportDetailsUser = async (req, res) => {
    const reportId = req.params.id;
    try {
      const query = `
        SELECT 
          r.description,
          r.created_at,
          ST_Y(r.location::geometry) AS lat,
          ST_X(r.location::geometry) AS lng,
          rd.report_id,
          rd.spread_rate,
          rd.road_status,
          rd.injured_number,
          rd.bleeding_number,
          rd.threatened_structures,
          rd.containment_percent,
          rd.burnt_area,
          rd.institution_type,
          rd.evacuated
        FROM reports r
        LEFT JOIN report_details rd ON r.id = rd.report_id
        WHERE r.id = $1
      `;
  
      const result = await con.query(query, [reportId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Report not found.' });
      }
  
      const report = result.rows[0];
  
      const response = {
        description: report.description,
        createdAt: report.created_at,
        location: {
          lat: report.lat,
          lng: report.lng
        },
        reportDetails: {
          report_id: report.report_id,
          spread_rate: report.spread_rate,
          road_status: report.road_status,
          injured_number: report.injured_number,
          bleeding_number: report.bleeding_number,
          threatened_structures: report.threatened_structures,
          containment_percent: report.containment_percent,
          burnt_area: report.burnt_area,
          institution_type: report.institution_type,
          evacuated: report.evacuated
        }
      };
  
      res.json(response);
    } catch (err) {
      console.error('Error fetching user report:', err);
      res.status(500).json({ error: 'Internal server error.' });
    }
};