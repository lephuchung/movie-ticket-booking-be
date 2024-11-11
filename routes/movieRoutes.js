const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Định nghĩa các route và liên kết đến các controller
router.get('/now_showing', movieController.getNowShowing);
router.get('/now_showing/:genre', movieController.getMoviesByGenre);
router.get('/genres', movieController.getGenres);
router.get('/details/:title', movieController.getMovieDetails);
router.get('/locations', movieController.getLocations);
router.get('/now_showing/location/:location', movieController.getMoviesByLocation);
router.get('/location/:location', movieController.getTheatersByLocation);
router.get('/showing_movie/:location/:title', movieController.getTheatersShowingMovieInLocation);
router.get('/showing_movie/:title', movieController.getTheatersShowingMovieNationwide);
router.get('/showtimes/:title/:theater/:startTime/:endTime', movieController.getShowtimesByMovieTheaterAndTimeRange);
router.get('/showtimes/location/:title/:location/:startTime/:endTime', movieController.getShowtimesByMovieLocationAndTimeRange);
router.get('/showtimes/:title/:startTime/:endTime', movieController.getShowtimesByMovieNationwideAndTimeRange);

module.exports = router;
