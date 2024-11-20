require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { authenticateToken } = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');

const app = express();
app.use(bodyParser.json());

// Ngăn cache trên trình duyệt để bảo vệ các trang sau khi đăng xuất
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store'); // Ngăn trình duyệt lưu cache
    res.setHeader('Pragma', 'no-cache');       // Tương thích với các trình duyệt cũ
    next();
});

// Routes
app.post('/login', authController.login);
app.post('/logout', authenticateToken, authController.logout); // Đăng xuất cần xác thực trước
app.post('/refreshAccessToken', authController.refreshAccessToken); // Làm mới AccessToken

// route được bảo vệ
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.userId}!` });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
