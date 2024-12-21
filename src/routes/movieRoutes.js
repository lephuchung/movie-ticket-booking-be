const express = require('express');
const router = express.Router();
// const movieController = require('../controllers/movieController');
const {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    getMoviesCurrentlyShowing,
    getMoviesCurrentlyShowingByLocation,
    getAllGenres,
    getMoviesByGenre,
} = require('../controllers/movieController');

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.get('/currently-showing', getMoviesCurrentlyShowing);
router.get('/currently-showing/location/:location', getMoviesCurrentlyShowingByLocation);
router.get('/genres', getAllGenres);
router.get('/genre/:genre', getMoviesByGenre);

module.exports = router;
