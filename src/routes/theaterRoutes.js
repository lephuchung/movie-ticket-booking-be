const express = require('express');
const {
    getAllTheaters,
    getTheaterById,
    createTheater,
    updateTheater,
    deleteTheater,
} = require('../controllers/theaterController');

const router = express.Router();

router.get('/', getAllTheaters);
router.get('/:id', getTheaterById);
router.post('/', createTheater);
router.put('/:id', updateTheater);
router.delete('/:id', deleteTheater);

module.exports = router;
