// backend/models/User.js
class User {
    constructor(first_name, last_name, gender, date_of_birth, email, password, profile_image) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.date_of_birth = date_of_birth;
        this.email = email;
        this.password = password;
        this.profile_image = profile_image;
    }

    static async create(user) {
        const [result] = await db.execute(
            'INSERT INTO users (first_name, last_name, gender, date_of_birth, email, password, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user.first_name, user.last_name, user.gender, user.date_of_birth, user.email, user.password, user.profile_image]
        );
        return result;
    }

    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, user) {
        const [result] = await db.execute(
            'UPDATE users SET first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, email = ?, profile_image = ? WHERE id = ?',
            [user.first_name, user.last_name, user.gender, user.date_of_birth, user.email, user.profile_image, id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
        return result;
    }
}

module.exports = User;
