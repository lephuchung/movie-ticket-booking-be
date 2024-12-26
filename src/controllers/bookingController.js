const db = require('../config/db');
const BookingModel = require('../models/bookingModel');

const bookTickets = (req, res) => {
    console.log("check req.body: ", req.body);
    const { userId, showtimeId, seatNumbers } = req.body;

    if (!Array.isArray(seatNumbers) || seatNumbers.length === 0) {
        return res.status(400).send('Danh sách ghế không hợp lệ.');
    }

    // Kiểm tra ghế đã được đặt
    const checkSeatsQuery = `
        SELECT SeatNumber FROM Tickets
        WHERE ShowtimeId = ? AND SeatNumber IN (?);
    `;

    db.query(checkSeatsQuery, [showtimeId, seatNumbers], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            const occupiedSeats = results.map(row => row.SeatNumber);
            return res.status(400).json({
                message: 'Đặt vé thất bại. Ghế đã được đặt.',
                occupiedSeats,
            });
        }

        // Lấy giá vé từ bảng showtimes dựa trên showtimeId
        const getTicketPriceQuery = `
            SELECT Price FROM Showtimes WHERE ShowtimeId = ?;
        `;
        db.query(getTicketPriceQuery, [showtimeId], (err, priceResults) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (priceResults.length === 0) {
                return res.status(404).send('Không tìm thấy thông tin showtime.');
            }

            const ticketPrice = priceResults[0].Price; // Giá vé từ bảng showtimes

            // Thêm vé vào bảng Tickets
            const ticketValues = seatNumbers.map(seatNumber => [
                seatNumber,
                new Date(),
                ticketPrice, // Sử dụng giá vé từ bảng showtimes
                'pending',
                userId,
                showtimeId,
            ]);

            const insertTicketsQuery = `
                INSERT INTO Tickets (SeatNumber, BookingTime, TotalPrice, PaymentStatus, UserId, ShowtimeId)
                VALUES ?;
            `;

            db.query(insertTicketsQuery, [ticketValues], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({
                    message: 'Đặt vé thành công!',
                    ticketsCreated: result.affectedRows,
                });
            });
        });
    });
};


// Xử lý thanh toán
const processPayment = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const booking = await BookingModel.getById(bookingId);

        if (!booking) return sendResponse(res, 404, { message: 'Booking not found' });
        if (booking.PaymentStatus === 'paid') {
            return sendResponse(res, 400, { message: 'Booking already paid' });
        }

        await BookingModel.updatePaymentStatus(bookingId, 'paid');
        sendResponse(res, 200, { message: 'Payment completed successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    bookTickets,
    processPayment,
};

