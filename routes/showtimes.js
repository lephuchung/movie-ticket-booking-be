const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/showtimes');

// API Routes
router.get('/find', showtimeController.findShowtimeWithPagination); // Tìm kiếm, phân trang và sắp xếp
router.post('/add', showtimeController.addShowtime);  // Thêm suất chiếu
router.put('/edit/:id', showtimeController.editShowtime); // Sửa suất chiếu
router.delete('/delete/:id', showtimeController.deleteShowtime); // Xóa suất chiếu

module.exports = router;
