const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// API thanh toán
router.post('/', paymentController.processPayment);

// API lấy thông tin thanh toán theo ID
router.get('/:id', paymentController.getPaymentById);

// API cập nhật trạng thái thanh toán
router.put('/:id', paymentController.updatePaymentStatus);

module.exports = router;
