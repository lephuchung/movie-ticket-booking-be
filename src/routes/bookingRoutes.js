const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');

// Booking routes
router.get('/bookings', BookingController.getBookings);
router.get('/bookings/:id', BookingController.getBooking);
router.get('/seats/:showtimeId', BookingController.getSeatStatus);
router.post('/bookings', BookingController.createBooking);
router.post('/bookseats', BookingController.bookSeats);
router.delete('/bookings/:id', BookingController.deleteBooking);
router.put('/bookings/:bookingId/pay', BookingController.processPayment);

module.exports = router;
