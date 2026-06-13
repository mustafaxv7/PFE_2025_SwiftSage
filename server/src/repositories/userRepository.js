import con from '../config/db.js';

class UserRepository {
    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await con.query(query, [email]);
        return rows[0];
    }

    async findById(id) {
        const query = `
            SELECT 
                user_id as id, 
                username as name, 
                email, 
                phone_number as phone, 
                is_organization_member, 
                community, 
                'user' as role 
            FROM users WHERE user_id = $1
        `;
        const { rows } = await con.query(query, [id]);
        return rows[0];
    }

    async create(userData) {
        const { name, email, phone, password, isOrganisationMember, community } = userData;
        const query = `
            INSERT INTO users (username, email, phone_number, password, is_organization_member, community)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING user_id;
        `;
        const values = [name, email, phone, password, isOrganisationMember || false, community];
        const { rows } = await con.query(query, values);
        return rows[0].user_id;
    }

    async findAdminByEmail(email) {
        const query = 'SELECT * FROM admins WHERE email = $1';
        const { rows } = await con.query(query, [email]);
        return rows[0];
    }

    async findAdminById(id) {
        const query =
            "SELECT admin_id as id, email, 'admin' as role FROM admins WHERE admin_id = $1";
        const { rows } = await con.query(query, [id]);
        return rows[0];
    }

    async getAll() {
        const query =
            'SELECT user_id as id, username as name, email, phone_number as phone, community FROM users ORDER BY created_at DESC';
        const { rows } = await con.query(query);
        return rows;
    }

    async delete(id) {
        const query = 'DELETE FROM users WHERE user_id = $1';
        await con.query(query, [id]);
    }

    async update(id, updates) {
        const fields = [];
        const values = [];
        let index = 1;

        if (updates.name) {
            fields.push(`username = $${index++}`);
            values.push(updates.name);
        }
        if (updates.email) {
            fields.push(`email = $${index++}`);
            values.push(updates.email);
        }
        if (updates.phone) {
            fields.push(`phone_number = $${index++}`);
            values.push(updates.phone);
        }
        if (updates.community) {
            fields.push(`community = $${index++}`);
            values.push(updates.community);
        }
        if (updates.isOrganisationMember !== undefined) {
            fields.push(`is_organization_member = $${index++}`);
            values.push(updates.isOrganisationMember);
        }

        if (fields.length === 0) return;

        values.push(id);
        const query = `
            UPDATE users 
            SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
            WHERE user_id = $${index}
        `;
        await con.query(query, values);
    }
}

export default new UserRepository();
