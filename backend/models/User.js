const db = require('../config/db');

class User {
    static async create(user) {
        const [result] = await db.execute(
            `INSERT INTO users (first_name, last_name, gender, date_of_birth, email, password, profile_image_url) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user.firstName, user.lastName, user.gender, user.dateOfBirth, user.email, user.password, user.profileImageUrl]
        );
        return result;
    }

    static async findByEmail(email) {
        const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute(`SELECT * FROM users WHERE id = ?`, [id]);
        return rows[0];
    }

    static async update(id, user) {
        const [result] = await db.execute(
            `UPDATE users SET first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, email = ?, profile_image_url = ? WHERE id = ?`,
            [user.firstName, user.lastName, user.gender, user.dateOfBirth, user.email, user.profileImageUrl, id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute(`DELETE FROM users WHERE id = ?`, [id]);
        return result;
    }

    static async savePasswordResetToken(id, token, expiration) {
        await db.execute(`UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE id = ?`, [token, expiration, id]);
    }

    static async findByPasswordResetToken(token) {
        const [rows] = await db.execute(`SELECT * FROM users WHERE reset_token = ? AND reset_token_expiration > NOW()`, [token]);
        return rows[0];
    }

    static async updatePassword(id, hashedPassword) {
        await db.execute(`UPDATE users SET password = ?, reset_token = NULL, reset_token_expiration = NULL WHERE id = ?`, [hashedPassword, id]);
    }
}

module.exports = User;
