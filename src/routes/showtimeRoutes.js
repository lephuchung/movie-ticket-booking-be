const express = require('express');
const {
    getAllShowtimes,
    getShowtimeById,
    createShowtime,
    updateShowtime,
    deleteShowtime,
} = require('../controllers/showtimeController');

const router = express.Router();

// router.get('/showtimes/:title/:theater/:startTime/:endTime', movieController.getShowtimesByMovieTheaterAndTimeRange); viết lại trong showtime
// router.get('/showtimes/location/:title/:location/:startTime/:endTime', movieController.getShowtimesByMovieLocationAndTimeRange); viết lại trong showtime
// router.get('/showtimes/:title/:startTime/:endTime', movieController.getShowtimesByMovieNationwideAndTimeRange); viết lại trong showtime

router.get('/', getAllShowtimes);
router.get('/:id', getShowtimeById);
router.post('/', createShowtime);
router.put('/:id', updateShowtime);
router.delete('/:id', deleteShowtime);

module.exports = router;
