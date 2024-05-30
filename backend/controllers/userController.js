// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');
// require('dotenv').config();

// exports.register = (req, res) => {
//     const { first_name, last_name, gender, date_of_birth, email, password } = req.body;
//     const profile_image = req.file ? req.file.filename : null;

//     const hashedPassword = bcrypt.hashSync(password, 10);

//     const sql = 'INSERT INTO users (first_name, last_name, gender, date_of_birth, email, password, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?)';
//     db.query(sql, [first_name, last_name, gender, date_of_birth, email, hashedPassword, profile_image], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         res.status(201).json({ message: 'User registered successfully!' });
//     });
// };

// exports.login = (req, res) => {
//     const { email, password } = req.body;

//     const sql = 'SELECT * FROM users WHERE email = ?';
//     db.query(sql, [email], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const user = results[0];

//         if (!bcrypt.compareSync(password, user.password)) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.json({ token });
//     });
// };

// exports.getProfile = (req, res) => {
//     const userId = req.user.id;

//     const sql = 'SELECT * FROM users WHERE id = ?';
//     db.query(sql, [userId], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         res.json(results[0]);
//     });
// };

// exports.updateProfile = (req, res) => {
//     const userId = req.user.id;
//     const { first_name, last_name, gender, date_of_birth, email } = req.body;
//     const profile_image = req.file ? req.file.filename : req.body.profile_image;

//     const sql = 'UPDATE users SET first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, email = ?, profile_image = ? WHERE id = ?';
//     db.query(sql, [first_name, last_name, gender, date_of_birth, email, profile_image, userId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         res.json({ message: 'Profile updated successfully!' });
//     });
// };

// exports.deleteAccount = (req, res) => {
//     const userId = req.user.id;

//     const sql = 'DELETE FROM users WHERE id = ?';
//     db.query(sql, [userId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         res.json({ message: 'Account deleted successfully!' });
//     });
// };


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

exports.register = (req, res) => {
    const { first_name, last_name, gender, date_of_birth, email, password } = req.body;
    const profile_image = req.file ? req.file.filename : null;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (first_name, last_name, gender, date_of_birth, email, password, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, gender, date_of_birth, email, hashedPassword, profile_image], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
};

// Other controller functions (login, getProfile, updateProfile, deleteAccount)...

// Other controller functions (login, getProfile, updateProfile, deleteAccount)...
