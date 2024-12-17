const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes');  // Import các route liên quan đến phim
const userRoutes = require('./routes/userRoutes');    // Import các route liên quan đến người dùng
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware để phân tích dữ liệu JSON từ yêu cầu
app.use(cors());
app.use(bodyParser.json());

// Sử dụng các route đã định nghĩa
app.use('/movies', movieRoutes); // Route cho phim
app.use('/users', userRoutes);   // Route cho người dùng
app.use('/auth', authRoutes);

// Khởi động server trên cổng 3000 hoặc cổng được cấu hình trong biến môi trường
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // In ra thông báo khi server bắt đầu chạy
});
