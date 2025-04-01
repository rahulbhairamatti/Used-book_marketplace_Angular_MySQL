// backend/config/db.config.js
// const mysql = require('mysql2');
const mysql = require('mysql2'); 
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env if not already loaded

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection pool
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('❌ Database connection was closed.');
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('❌ Database has too many connections.');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('❌ Database connection was refused.');
        } else {
            console.error('❌ Database connection error:', err);
        }
        return;
    }

    if (connection) connection.release();
    console.log('✅ Database connection successful!');
});


module.exports = pool;