const BookingModel = require('../models/bookingModel');

// Chuẩn hóa phản hồi API
const sendResponse = (res, statusCode, data) => {
    return res.status(statusCode).json(data);
};

// Lấy danh sách booking
const getBookings = async (req, res, next) => {
    try {
        const bookings = await BookingModel.getAll();
        sendResponse(res, 200, bookings);
    } catch (error) {
        next(error);
    }
};

// Lấy thông tin booking theo ID
const getBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await BookingModel.getById(id);
        if (!booking) return sendResponse(res, 404, { message: 'Booking not found' });

        sendResponse(res, 200, booking);
    } catch (error) {
        next(error);
    }
};

// Lấy tình trạng ghế theo suất chiếu
const getSeatStatus = async (req, res, next) => {
    try {
        const { showtimeId } = req.params;
        const seats = await BookingModel.getSeatStatusByShowtime(showtimeId);
        sendResponse(res, 200, seats);
    } catch (error) {
        next(error);
    }
};

// Tạo booking
const createBooking = async (req, res, next) => {
    try {
        const bookingData = req.body;
        const booking = await BookingModel.create(bookingData);
        sendResponse(res, 201, { message: 'Booking created successfully', booking });
    } catch (error) {
        next(error);
    }
};

// Đặt vé với nhiều ghế
const bookSeats = async (req, res, next) => {
    try {
        const { bookings } = req.body;

        const result = await BookingModel.bookSeats(bookings);
        const seatIds = bookings.map(({ SeatId }) => SeatId);
        await BookingModel.updateSeatStatus(seatIds, 'reserved');

        sendResponse(res, 201, { message: 'Seats booked successfully', result });
    } catch (error) {
        next(error);
    }
};

// Xóa booking
const deleteBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        await BookingModel.delete(id);
        sendResponse(res, 200, { message: 'Booking deleted successfully' });
    } catch (error) {
        next(error);
    }
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
    getBookings,
    getBooking,
    getSeatStatus,
    createBooking,
    bookSeats,
    deleteBooking,
    processPayment,
};

