const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Lấy danh sách tất cả booking
router.get('/bookings', bookingController.getBookings);

// Lấy thông tin booking theo ID
router.get('/bookings/:id', bookingController.getBooking);

// Lấy tình trạng ghế theo suất chiếu
router.get('/showtimes/:showtimeId/seats', bookingController.getSeatStatus);

// Tạo mới một booking
router.post('/bookings', bookingController.createBooking);

// Đặt nhiều ghế
router.post('/bookings/seats', bookingController.bookSeats);

// Xóa một booking theo ID
router.delete('/bookings/:id', bookingController.deleteBooking);

// Xử lý thanh toán cho một booking
router.put('/bookings/:bookingId/payment', bookingController.processPayment);

module.exports = router;
