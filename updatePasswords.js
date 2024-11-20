require('dotenv').config();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// Kết nối đến cơ sở dữ liệu
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the MySQL database!');
});

// Lấy tất cả người dùng
db.query('SELECT UserId, Password FROM Users', async (err, results) => {
    if (err) {
        console.error('Error fetching users:', err);
        db.end();
        return;
    }

    for (const user of results) {
        const { UserId, Password } = user;

        if (Password.startsWith('$2b$')) {
            console.log(`User ${UserId} already has a hashed password, skipping...`);
            continue;
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        db.query('UPDATE Users SET Password = ? WHERE UserId = ?', [hashedPassword, UserId], (err) => {
            if (err) {
                console.error(`Error updating password for UserId ${UserId}:`, err);
            } else {
                console.log(`Password for UserId ${UserId} updated successfully.`);
            }
        });
    }

    db.end(() => {
        console.log('Database connection closed.');
    });
});
