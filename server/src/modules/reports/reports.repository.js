import con from '../../core/config/database.js';

class ReportsRepository {
    async create(reportData) {
        const { lng, lat, altitude, amplitude, title, description, crisisType, userId, status } = reportData;
        const query = `
            INSERT INTO reports (location, altitude, amplitude, title, description, crisis_type, user_id, status)
            VALUES (ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `;
        const values = [lng, lat, altitude, amplitude, title, description, crisisType, userId, status || 'Active'];
        const { rows } = await con.query(query, values);
        return rows[0].id;
    }

    async createDetails(reportId, details) {
        const query = `
            INSERT INTO report_details (
                report_id, spread_rate, road_status, injured_number, bleeding_number,
                threatened_structures, containment_percent, burnt_area, institution_type, evacuated
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        const values = [
            reportId, details.spreadRate, details.roadStatus, details.injuredNumber, details.bleedingNumber,
            details.threatenedStructures, details.containmentPercent, details.burntArea, details.institutionType, details.evacuated,
        ];
        await con.query(query, values);
    }

    async createCategories(reportId, categories) {
        const query = `
            INSERT INTO categories (
                report_id, throttled, burnt, fractions, missing, trapped, submerged_dwelling, electrification, explosion
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;
        const values = [
            reportId, categories.throttled, categories.burnt, categories.fractions, categories.missing,
            categories.trapped, categories.submergedDwelling, categories.electrification, categories.explosion,
        ];
        await con.query(query, values);
    }

    async findById(id) {
        const query = `
            SELECT r.*, ST_Y(r.location::geometry) AS lat, ST_X(r.location::geometry) AS lng,
                   u.username AS reporter_name,
                   c.missing, c.trapped, c.submerged_dwelling, c.electrification,
                   rd.road_status
            FROM reports r
            LEFT JOIN users u ON r.user_id = u.user_id
            LEFT JOIN categories c ON r.id = c.report_id
            LEFT JOIN report_details rd ON r.id = rd.report_id
            WHERE r.id = $1
        `;
        const { rows } = await con.query(query, [id]);
        return rows[0];
    }

    async getAll() {
        const query = `
            SELECT r.id, r.title, r.description, r.crisis_type as "crisisType", r.status,
                   ST_Y(r.location::geometry) AS lat, ST_X(r.location::geometry) AS lng,
                   u.username AS "reportedBy", r.created_at as "createdAt"
            FROM reports r
            LEFT JOIN users u ON r.user_id = u.user_id
            ORDER BY r.created_at DESC
        `;
        const { rows } = await con.query(query);
        return rows;
    }

    async update(id, updates) {
        const fields = [];
        const values = [];
        let index = 1;
        const mapping = { title: 'title', description: 'description', crisisType: 'crisis_type', status: 'status' };

        for (const [key, column] of Object.entries(mapping)) {
            if (updates[key] !== undefined) {
                fields.push(`${column} = $${index++}`);
                values.push(updates[key]);
            }
        }
        if (fields.length === 0) return;

        values.push(id);
        const query = `UPDATE reports SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${index}`;
        await con.query(query, values);
    }

    async updateDetails(reportId, details) {
        const allowedFields = [
            'spread_rate', 'road_status', 'injured_number', 'bleeding_number',
            'threatened_structures', 'containment_percent', 'burnt_area', 'institution_type', 'evacuated',
        ];
        const updates = [];
        const values = [];
        let paramIndex = 1;

        for (const field of allowedFields) {
            if (field in details) {
                updates.push(`${field} = $${paramIndex++}`);
                values.push(details[field]);
            }
        }
        if (updates.length > 0) {
            values.push(reportId);
            const query = `UPDATE report_details SET ${updates.join(', ')} WHERE report_id = $${paramIndex}`;
            await con.query(query, values);
        }
    }
}

export default new ReportsRepository();
