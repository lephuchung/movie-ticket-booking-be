// db.js
const mysql = require('mysql');

// Tạo kết nối đến cơ sở dữ liệu MySQL với thông tin cấu hình
const db = mysql.createConnection({
    host: 'localhost',        // Địa chỉ máy chủ
    user: 'root',             // Tên đăng nhập MySQL (mặc định là 'root' trong XAMPP)
    password: '',             // Mật khẩu MySQL (để trống nếu sử dụng mặc định trong XAMPP)
    database: 'MovieTheater'  // Tên cơ sở dữ liệu đã tạo
});

// Kết nối đến MySQL và kiểm tra lỗi
db.connect((err) => {
    if (err) throw err;
    console.log('Database connected!'); // Thông báo nếu kết nối thành công
});

module.exports = db; // Xuất kết nối để dùng trong các model
