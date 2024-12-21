const db = require('../db');

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
        const query = 'INSERT INTO Tickets (TicketId, UserId, ShowtimeId, SeatNumber, Room, Price, PaymentStatus, BookingTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const { TicketId, UserId, ShowtimeId, SeatNumber, Room, Price, PaymentStatus, BookingTime } = ticket;
        return new Promise((resolve, reject) => {
            db.query(query, [TicketId, UserId, ShowtimeId, SeatNumber, Room, Price, PaymentStatus, BookingTime], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Cập nhật thông tin vé
    update: (id, ticket) => {
        const query = 'UPDATE Tickets SET UserId = ?, ShowtimeId = ?, SeatNumber = ?, Room = ?, Price = ?, PaymentStatus = ?, BookingTime = ? WHERE TicketId = ?';
        const { UserId, ShowtimeId, SeatNumber, Room, Price, PaymentStatus, BookingTime } = ticket;
        return new Promise((resolve, reject) => {
            db.query(query, [UserId, ShowtimeId, SeatNumber, Room, Price, PaymentStatus, BookingTime, id], (err, results) => {
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
