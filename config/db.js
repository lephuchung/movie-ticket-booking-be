const mysql = require('mysql2');
require('dotenv').config();

// Tạo kết nối MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '', // Để trống nếu không có mật khẩu
    database: process.env.DB_NAME
});

// Kết nối tới MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);  // Thoát ứng dụng nếu không thể kết nối
    }
    console.log('Connected to the MySQL database!');
});

module.exports = db;
