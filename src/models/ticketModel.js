const db = require('../config/db');

const TicketModel = {
    // Lấy danh sách tất cả vé
    getAll: () => {
        const query = 'SELECT * FROM Tickets';
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Lấy thông tin chi tiết một vé
    getById: (id) => {
        const query = 'SELECT * FROM Tickets WHERE TicketId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    // Thêm một vé mới
    create: (ticket) => {
        const query = 'INSERT INTO Tickets (SeatNumber, BookingTime, TotalPrice, PaymentStatus, UserId, ShowtimeId, PaymentId) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const { SeatNumber, BookingTime, TotalPrice, PaymentStatus, UserId, ShowtimeId, PaymentId } = ticket;
        return new Promise((resolve, reject) => {
            db.query(query, [SeatNumber, BookingTime, TotalPrice, PaymentStatus, UserId, ShowtimeId, PaymentId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Cập nhật thông tin vé
    update: (id, ticket) => {
        const query = 'UPDATE Tickets SET SeatNumber = ?, BookingTime = ?, TotalPrice = ?, PaymentStatus = ?, UserId = ?, ShowtimeId = ?, PaymentId = ? WHERE TicketId = ?';
        const { SeatNumber, BookingTime, TotalPrice, PaymentStatus, UserId, ShowtimeId, PaymentId } = ticket;
        return new Promise((resolve, reject) => {
            db.query(query, [SeatNumber, BookingTime, TotalPrice, PaymentStatus, UserId, ShowtimeId, PaymentId, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Xóa một vé
    delete: (id) => {
        const query = 'DELETE FROM Tickets WHERE TicketId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Lấy vé được đặt bởi một người
    getByUserEmail: (email) => {
        const query = `
          SELECT t.* 
          FROM Tickets t
          JOIN Users u ON t.UserId = u.UserId
          WHERE u.Email = ?
        `;
        return new Promise((resolve, reject) => {
            db.query(query, [email], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = TicketModel;
