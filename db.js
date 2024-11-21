const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Thêm mật khẩu nếu cần
    database: 'MovieTheater', // Tên database
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;
