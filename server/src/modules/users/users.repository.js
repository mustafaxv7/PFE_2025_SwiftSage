import con from '../../core/config/database.js';

class UsersRepository {
    async findAll() {
        const query =
            'SELECT user_id as id, username as name, email, phone_number as phone, community FROM users ORDER BY created_at DESC';
        const { rows } = await con.query(query);
        return rows;
    }

    async findById(id) {
        const { rows } = await con.query('SELECT * FROM users WHERE user_id = $1', [id]);
        return rows[0];
    }

    async delete(id) {
        await con.query('DELETE FROM users WHERE user_id = $1', [id]);
    }

    async update(id, updates) {
        const fields = [];
        const values = [];
        let index = 1;

        const mapping = {
            name: 'username',
            email: 'email',
            phone: 'phone_number',
            community: 'community',
            isOrganisationMember: 'is_organization_member',
        };

        for (const [key, column] of Object.entries(mapping)) {
            if (updates[key] !== undefined) {
                fields.push(`${column} = $${index++}`);
                values.push(updates[key]);
            }
        }

        if (fields.length === 0) return;

        values.push(id);
        const query = `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE user_id = $${index}`;
        await con.query(query, values);
    }
}

export default new UsersRepository();
