
import dotenv from 'dotenv';
dotenv.config();

export const getReportDetailsAdmin = async (req, res) => {
    const reportId = req.params.id;
    try {
        const query = `
        SELECT 
            r.id,
            r.title,
            r.description,
            r.crisis_type,
            r.status,
            r.altitude,
            r.amplitude,
            TO_CHAR(r.created_at, 'DD Mon, YYYY at HH24:MI') AS reported_on,
            ST_Y(r.location::geometry) AS lat,
            ST_X(r.location::geometry) AS lng,
            u.full_name AS reporter_name,
            c.missing,
            c.trapped,
            c.submerged_dwelling,
            c.electrification,
            rd.road_status
        FROM reports r
        LEFT JOIN users u ON r.user_id = u.id
        LEFT JOIN categories c ON r.id = c.report_id
        LEFT JOIN report_details rd ON r.id = rd.report_id
        WHERE r.id = $1
        `;

        const result = await con.query(query, [reportId]);

        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Report not found.' });
        }

        const report = result.rows[0];

        const response = {
        title: report.title,
        reportedOn: report.reported_on,
        location: {
            lat: report.lat,
            lng: report.lng
        },
        crisisType: report.crisis_type,
        status: report.status,
        altitude: report.altitude,
        amplitude: report.amplitude,
        description: report.description,
        reportedBy: report.reporter_name || 'Unknown',
        crisisDetails: {
            roadStatus: report.road_status || 'Unknown',
            missing: report.missing || 0,
            trapped: report.trapped || 0,
            submergedDwellings: report.submerged_dwelling || false,
            electrification: report.electrification || false
        }
        };

        return res.json(response);
    } catch (err) {
        console.error('Error fetching report:', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};