const PaymentModel = require('../models/paymentModel');  // Import payment model
const TicketModel = require('../models/ticketModel');    // Import ticket model
const db = require('../config/db');                      // Import database connection

// Hàm tính tổng giá vé
const calculateTotalPrice = async (showtimeId, numberOfTickets) => {
    try {
        // Lấy thông tin showtime và movieId
        const query = 'SELECT Movies.price FROM Showtimes JOIN Movies ON Showtimes.movieId = Movies.id WHERE Showtimes.id = ?';
        const result = await new Promise((resolve, reject) => {
            db.query(query, [showtimeId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });

        if (result.length === 0) {
            throw new Error('Showtime not found');
        }

        const moviePrice = result[0].price; // Giá vé của bộ phim
        const totalPrice = moviePrice * numberOfTickets; // Tính tổng giá vé
        return totalPrice;
    } catch (err) {
        throw new Error('Failed to calculate total price: ' + err.message);
    }
};

// Hàm xử lý thanh toán
const processPayment = async (req, res) => {
    const { showtimeId, numberOfTickets, userId, paymentMethod } = req.body;

    try {
        // Kiểm tra các thông tin đầu vào
        if (!showtimeId || !numberOfTickets || !userId || !paymentMethod) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Tính toán tổng giá vé
        const totalPrice = await calculateTotalPrice(showtimeId, numberOfTickets);

        // Lưu thông tin thanh toán vào cơ sở dữ liệu (PaymentModel)
        const payment = await new Promise((resolve, reject) => {
            PaymentModel.create({
                userId,
                showtimeId,
                numberOfTickets,
                totalPrice,
                paymentMethod,
                status: 'pending',  // Trạng thái thanh toán ban đầu là 'pending'
            }, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        // Cập nhật trạng thái thanh toán của tất cả vé
        const tickets = await TicketModel.getTicketsByShowtimeId(showtimeId);
        if (tickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found for the showtime' });
        }

        // Cập nhật trạng thái thanh toán của các vé
        for (let ticket of tickets) {
            await TicketModel.update(ticket.id, {
                PaymentStatus: 'paid',  // Cập nhật trạng thái thanh toán của vé
                PaymentId: payment.id,  // Liên kết vé với PaymentId
            });
        }

        // Trả về kết quả thanh toán
        return res.status(201).json({
            message: 'Payment processed successfully',
            payment: {
                id: payment.id,
                totalPrice: payment.totalPrice,
                status: payment.status,
                paymentMethod: payment.paymentMethod,
                showtimeId: payment.showtimeId,
                numberOfTickets: payment.numberOfTickets,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to process payment', details: err.message });
    }
};
const getPaymentById = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await PaymentModel.getById(id); // Gọi hàm getById từ model
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment); // Trả về thông tin thanh toán
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch payment', details: err.message });
    }
};
const updatePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const payment = await PaymentModel.getById(id); // Gọi hàm getById từ model để lấy thông tin thanh toán
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Cập nhật trạng thái thanh toán
        const updatedPayment = await PaymentModel.update(id, { status });

        res.status(200).json({
            message: 'Payment status updated successfully',
            payment: updatedPayment,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update payment status', details: err.message });
    }
};


module.exports = {
    processPayment,
    getPaymentById,
    updatePaymentStatus,
};
