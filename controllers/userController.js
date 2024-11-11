const userModel = require('../models/userModel'); // Import model của người dùng

// Controller cho API lấy thông tin chi tiết của một người dùng theo tên
exports.getUserDetails = (req, res) => {
    userModel.getUserDetails(req.params.username, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]); // Trả về một đối tượng người dùng
    });
};

// Controller cho API lấy lịch sử đặt vé của một người dùng
exports.getUserTickets = (req, res) => {
    userModel.getUserTickets(req.params.username, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result); // Trả về mảng các vé đã đặt
    });
};

// Controller cho API lấy thông tin chi tiết của một vé theo mã vé
exports.getTicketDetails = (req, res) => {
    userModel.getTicketDetails(req.params.ticketId, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]); // Trả về đối tượng vé
    });
};
