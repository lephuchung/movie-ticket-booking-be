const TheaterModel = require('../models/theaterModel');

// Lấy danh sách tất cả các rạp
const getAllTheaters = async (req, res) => {
    try {
        const theaters = await TheaterModel.getAll();
        res.status(200).json(theaters);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch theaters', details: err });
    }
};

// Lấy thông tin chi tiết một rạp
const getTheaterById = async (req, res) => {
    const { id } = req.params;
    try {
        const theater = await TheaterModel.getById(id);
        if (!theater) {
            return res.status(404).json({ message: 'Theater not found' });
        }
        res.status(200).json(theater);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch theater', details: err });
    }
};

// Thêm một rạp mới
const createTheater = async (req, res) => {
    const { TheaterId, Name, TotalRoom, Location } = req.body;
    try {
        const result = await TheaterModel.create({ TheaterId, Name, TotalRoom, Location });
        res.status(201).json({ message: 'Theater created successfully', theater: result });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create theater', details: err });
    }
};

// Cập nhật thông tin rạp
const updateTheater = async (req, res) => {
    const { id } = req.params;
    const { Name, TotalRoom, Location } = req.body;
    try {
        const result = await TheaterModel.update(id, { Name, TotalRoom, Location });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Theater not found' });
        }
        res.status(200).json({ message: 'Theater updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update theater', details: err });
    }
};

// Xóa một rạp
const deleteTheater = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await TheaterModel.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Theater not found' });
        }
        res.status(200).json({ message: 'Theater deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete theater', details: err });
    }
};

module.exports = {
    getAllTheaters,
    getTheaterById,
    createTheater,
    updateTheater,
    deleteTheater,
};
