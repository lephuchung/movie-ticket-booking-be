const db = require('../config/db'); // Kết nối cơ sở dữ liệu

const BookingModel = {
    // Lấy danh sách tất cả các booking
    getAll: () => {
        const query = 'SELECT * FROM Bookings';
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Lấy thông tin booking theo ID
    getById: (id) => {
        const query = 'SELECT * FROM Bookings WHERE BookingId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    // Tạo booking mới
    create: ({ RoomId, ShowtimeId, SeatId, UserId, Status = 'pending' }) => {
        const query = `
            INSERT INTO Bookings (RoomId, ShowtimeId, SeatId, UserId, Status) 
            VALUES (?, ?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            db.query(query, [RoomId, ShowtimeId, SeatId, UserId, Status], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Xóa booking
    delete: (id) => {
        const query = 'DELETE FROM Bookings WHERE BookingId = ?';
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

    // Đặt ghế
    bookSeats: (bookingDetails) => {
        const query = `
            INSERT INTO Bookings (SeatId, ShowtimeId, UserId, Status) 
            VALUES ?
        `;
        const values = bookingDetails.map(({ SeatId, ShowtimeId, UserId, Status }) => [SeatId, ShowtimeId, UserId, Status]);
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
    updatePaymentStatus: (bookingId, status) => {
        const query = 'UPDATE Bookings SET PaymentStatus = ? WHERE BookingId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [status, bookingId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = BookingModel;
