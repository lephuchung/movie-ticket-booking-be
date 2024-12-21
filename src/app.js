const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes');
const theaterRoutes = require('./routes/theaterRoutes')
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// const API_PREFIX = '/api/v1';
const API_PREFIX = '';
// Sử dụng các route đã định nghĩa
app.use(`${API_PREFIX}/movies`, movieRoutes);
app.use(`${API_PREFIX}/theater`, theaterRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/tickets`, ticketRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes);

// Khởi động server trên cổng 3000 hoặc cổng được cấu hình trong biến môi trường
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // In ra thông báo khi server bắt đầu chạy
});
