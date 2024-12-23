const db = require('../config/db'); // Kết nối cơ sở dữ liệu

const bookingModel = {
    // Lấy danh sách tất cả các vé
    getAll: () => {
        const query = 'SELECT * FROM Tickets';  // Thay Bookings bằng Tickets
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Lấy thông tin vé theo ID
    getById: (id) => {
        const query = 'SELECT * FROM Tickets WHERE TicketId = ?';  // Thay Bookings bằng Tickets
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    // Tạo vé mới
    create: ({ RoomId, ShowtimeId, SeatId, UserId, Status = 'pending' }) => {
        const query = `
            INSERT INTO Tickets (RoomId, ShowtimeId, SeatId, UserId, Status) 
            VALUES (?, ?, ?, ?, ?)
        `;  // Chuyển từ Bookings sang Tickets
        return new Promise((resolve, reject) => {
            db.query(query, [RoomId, ShowtimeId, SeatId, UserId, Status], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Xóa vé
    delete: (id) => {
        const query = 'DELETE FROM Tickets WHERE TicketId = ?';  // Chuyển từ Bookings sang Tickets
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Lấy tình trạng ghế theo suất chiếu
    getSeatStatusByShowtime: (showtimeId) => {
        const query = `
            SELECT s.SeatId, s.SeatNumber, s.Line, s.Status
            FROM Seats s
            JOIN Showtimes st ON s.RoomId = st.RoomId
            WHERE st.ShowtimeId = ?
        `;
        return new Promise((resolve, reject) => {
            db.query(query, [showtimeId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Đặt vé
    bookTickets: (ticketDetails) => {
        const query = `
            INSERT INTO Tickets (SeatId, ShowtimeId, UserId, Status) 
            VALUES ?  // Chuyển từ Bookings sang Tickets
        `;
        const values = ticketDetails.map(({ SeatId, ShowtimeId, UserId, Status }) => [SeatId, ShowtimeId, UserId, Status]);
        return new Promise((resolve, reject) => {
            db.query(query, [values], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Cập nhật trạng thái ghế
    updateSeatStatus: (seatIds, status) => {
        const query = `
            UPDATE Seats
            SET Status = ?
            WHERE SeatId IN (?)
        `;
        return new Promise((resolve, reject) => {
            db.query(query, [status, seatIds], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Cập nhật trạng thái thanh toán
    updatePaymentStatus: (ticketId, status) => {
        const query = 'UPDATE Tickets SET PaymentStatus = ? WHERE TicketId = ?';  // Chuyển từ Bookings sang Tickets
        return new Promise((resolve, reject) => {
            db.query(query, [status, ticketId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = bookingModel;
