const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');  // Đảm bảo đã có paymentController

// API thanh toán
router.post('/payment', paymentController.processPayment); // Xử lý thanh toán

// API lấy thông tin thanh toán theo ID
router.get('/payment/:id', paymentController.getPaymentById);

// API cập nhật trạng thái thanh toán
router.put('/payment/:id', paymentController.updatePaymentStatus);

module.exports = router;
