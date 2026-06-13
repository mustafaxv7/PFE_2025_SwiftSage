import con from '../../core/config/database.js';

class AuthRepository {
    async findUserByEmail(email) {
        const { rows } = await con.query('SELECT * FROM users WHERE email = $1', [email]);
        return rows[0];
    }

    async findAdminByEmail(email) {
        const { rows } = await con.query('SELECT * FROM admins WHERE email = $1', [email]);
        return rows[0];
    }

    async findUserById(id) {
        const query = `
            SELECT user_id as id, username as name, email, phone_number as phone,
                   is_organization_member, community, 'user' as role
            FROM users WHERE user_id = $1
        `;
        const { rows } = await con.query(query, [id]);
        return rows[0];
    }

    async findAdminById(id) {
        const query =
            "SELECT admin_id as id, email, 'admin' as role FROM admins WHERE admin_id = $1";
        const { rows } = await con.query(query, [id]);
        return rows[0];
    }

    async createUser({ name, email, phone, password, isOrganisationMember, community }) {
        const query = `
            INSERT INTO users (username, email, phone_number, password, is_organization_member, community)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING user_id
        `;
        const { rows } = await con.query(query, [
            name,
            email,
            phone,
            password,
            isOrganisationMember || false,
            community,
        ]);
        return rows[0].user_id;
    }
}

export default new AuthRepository();
