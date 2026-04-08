import con from '../config/db.js';

class FeedbackRepository {
    async create({ userId, message, rating }) {
        const query = 'INSERT INTO feedback (user_id, message, rating) VALUES ($1, $2, $3) RETURNING id';
        const { rows } = await con.query(query, [userId, message, rating]);
        return rows[0].id;
    }

    async findAll() {
        const query = `
            SELECT f.*, u.username as user_name 
            FROM feedback f 
            LEFT JOIN users u ON f.user_id = u.user_id 
            ORDER BY f.created_at DESC
        `;
        const { rows } = await con.query(query);
        return rows;
    }
}

export default new FeedbackRepository();
