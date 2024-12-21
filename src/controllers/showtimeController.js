const ShowtimeModel = require('../models/showtimeModel');

// Lấy danh sách tất cả các suất chiếu
const getAllShowtimes = async (req, res) => {
    try {
        const showtimes = await ShowtimeModel.getAll();
        res.status(200).json(showtimes);
    } catch (err) {
        res.status(500).json({ error: 'Không thể lấy danh sách suất chiếu', details: err });
    }
};

// Lấy thông tin chi tiết một suất chiếu
const getShowtimeById = async (req, res) => {
    const { id } = req.params;
    try {
        const showtime = await ShowtimeModel.getById(id);
        if (!showtime) {
            return res.status(404).json({ message: 'Suất chiếu không tồn tại' });
        }
        res.status(200).json(showtime);
    } catch (err) {
        res.status(500).json({ error: 'Không thể lấy thông tin suất chiếu', details: err });
    }
};

// Thêm một suất chiếu mới
const createShowtime = async (req, res) => {
    const { ShowtimeId, MovieId, RoomId, ShowtimeTime, TicketPrice } = req.body;
    try {
        const result = await ShowtimeModel.create({ ShowtimeId, MovieId, RoomId, ShowtimeTime, TicketPrice });
        res.status(201).json({ message: 'Suất chiếu đã được tạo thành công', showtime: result });
    } catch (err) {
        res.status(500).json({ error: 'Không thể tạo suất chiếu', details: err });
    }
};

// Cập nhật thông tin suất chiếu
const updateShowtime = async (req, res) => {
    const { id } = req.params;
    const { MovieId, RoomId, ShowtimeTime, TicketPrice } = req.body;
    try {
        const result = await ShowtimeModel.update(id, { MovieId, RoomId, ShowtimeTime, TicketPrice });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Suất chiếu không tồn tại' });
        }
        res.status(200).json({ message: 'Cập nhật suất chiếu thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Không thể cập nhật suất chiếu', details: err });
    }
};

// Xóa một suất chiếu
const deleteShowtime = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ShowtimeModel.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Suất chiếu không tồn tại' });
        }
        res.status(200).json({ message: 'Suất chiếu đã bị xóa' });
    } catch (err) {
        res.status(500).json({ error: 'Không thể xóa suất chiếu', details: err });
    }
};

module.exports = {
    getAllShowtimes,
    getShowtimeById,
    createShowtime,
    updateShowtime,
    deleteShowtime,
};
