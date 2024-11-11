const db = require('../db'); // Kết nối cơ sở dữ liệu

// Truy vấn SQL để lấy thông tin chi tiết của một người dùng theo tên
exports.getUserDetails = (username, callback) => {
    db.query('SELECT * FROM Users WHERE Name = ?', [username], callback);
};

// Truy vấn SQL để lấy lịch sử đặt vé của một người dùng
exports.getUserTickets = (username, callback) => {
    const sql = `
        SELECT Tickets.* FROM Tickets 
        JOIN Users ON Tickets.UserId = Users.UserId 
        WHERE Users.Name = ?`;
    db.query(sql, [username], callback);
};

// Truy vấn SQL để lấy thông tin chi tiết của một vé theo mã vé
exports.getTicketDetails = (ticketId, callback) => {
    db.query('SELECT * FROM Tickets WHERE TicketId = ?', [ticketId], callback);
};
