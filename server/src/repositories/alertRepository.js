import con from '../config/db.js';

class AlertRepository {
    async create({
        message,
        description,
        date,
        time,
        status,
        importance,
        type,
        location,
        affectedArea,
        adminId,
    }) {
        const query = `
            INSERT INTO alerts (message, description, date, "time", status, importance, type, location, affected_area, created_by_admin_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id;
        `;
        const values = [
            message,
            description,
            date,
            time,
            status,
            importance,
            type,
            location,
            affectedArea,
            adminId,
        ];
        const { rows } = await con.query(query, values);
        return rows[0].id;
    }

    async findAll() {
        const query = `
            SELECT id, message, description, date, "time"::text, status, importance, type, location, affected_area as "affectedArea", created_at
            FROM alerts 
            ORDER BY created_at DESC
        `;
        const { rows } = await con.query(query);
        return rows;
    }

    async findById(id) {
        const query = `
            SELECT id, message, description, date, "time"::text, status, importance, type, location, affected_area as "affectedArea", created_at
            FROM alerts 
            WHERE id = $1
        `;
        const { rows } = await con.query(query, [id]);
        return rows[0];
    }

    async update(id, updates) {
        const fields = [];
        const values = [];
        let index = 1;

        const mapping = {
            message: 'message',
            description: 'description',
            status: 'status',
            importance: 'importance',
            type: 'type',
            location: 'location',
            affectedArea: 'affected_area',
        };

        for (const [key, column] of Object.entries(mapping)) {
            if (updates[key] !== undefined) {
                fields.push(`${column} = $${index++}`);
                values.push(updates[key]);
            }
        }

        if (fields.length === 0) return;

        values.push(id);
        const query = `
            UPDATE alerts 
            SET ${fields.join(', ')}, created_at = CURRENT_TIMESTAMP
            WHERE id = $${index}
        `;
        await con.query(query, values);
    }

    async delete(id) {
        await con.query('DELETE FROM alerts WHERE id = $1', [id]);
    }
}

export default new AlertRepository();
