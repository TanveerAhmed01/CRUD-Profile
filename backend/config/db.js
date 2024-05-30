require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Test the database connection
db.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection
  })
  .catch(err => {
    console.error('Error connecting to MySQL database:', err);
  });

module.exports = db;
