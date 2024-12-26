const PaymentModel = require('../models/paymentModel'); // Import payment model
const ShowtimeModel = require('../models/showtimeModel'); // Import showtime model

// Hàm xử lý thanh toán
const processPayment = async (req, res) => {
    const { showtimeId, seatNumbers, userId, paymentMethod } = req.body;

    // Kiểm tra đầu vào
    if (!showtimeId || !seatNumbers || !userId || !paymentMethod) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Lấy giá vé từ bảng showtimes
        const showtime = await ShowtimeModel.getById(showtimeId);
        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        const pricePerSeat = showtime.Price; // Giá vé mỗi ghế
        const totalPrice = seatNumbers * pricePerSeat; // Tính tổng giá vé

        // Lưu thông tin thanh toán vào cơ sở dữ liệu
        const payment = await PaymentModel.create({
            PaymentStatus: 'pending', // Trạng thái thanh toán ban đầu là 'pending'
            Amount: totalPrice,
            PaymentMethod: paymentMethod,
            UserId: userId,
            PaymentId: null, // Có thể để null hoặc một giá trị mặc định
        });

        return res.status(201).json({
            message: 'Payment processed successfully',
            payment: {
                id: payment.insertId, // Trả về ID thanh toán mới
                totalPrice: totalPrice,
                PaymentStatus: 'pending',
                PaymentMethod: paymentMethod,
                showtimeId: showtimeId,
                seatNumbers: seatNumbers,
            },
        });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to process payment', details: err.message });
    }
};

// Hàm lấy thông tin thanh toán theo ID
const getPaymentById = (req, res) => {
    const paymentId = req.params.id; // Lấy id từ URL parameters

    PaymentModel.getById(paymentId, (err, payment) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve payment', details: err.message });
        }
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        return res.status(200).json({ payment });
    });
};

// Hàm cập nhật trạng thái thanh toán
const updatePaymentStatus = (req, res) => {
    const { id, paymentStatus } = req.body;

    PaymentModel.update(id, { PaymentStatus: paymentStatus }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update payment', details: err.message });
        }
        return res.status(200).json({ message: 'Payment status updated', result });
    });
};

// Xuất các phương thức
module.exports = {
    processPayment,
    getPaymentById,
    updatePaymentStatus,
};
