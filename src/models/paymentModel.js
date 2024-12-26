const db = require('../config/db'); // Kết nối đến cơ sở dữ liệu

// Hàm tạo thanh toán mới
const createPayment = (paymentData, callback) => {
    const { userId, showtimeId, numberOfTickets, totalPrice, paymentMethod, status } = paymentData;
    const query = 'INSERT INTO Payments (userId, showtimeId, numberOfTickets, totalPrice, paymentMethod, status) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [userId, showtimeId, numberOfTickets, totalPrice, paymentMethod, status], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Hàm tìm thanh toán theo ID
const getPaymentById = (id, callback) => {
    const query = 'SELECT * FROM Payments WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result[0]);
    });
};

// Hàm cập nhật trạng thái thanh toán
const updatePayment = (id, updatedData, callback) => {
    const { status } = updatedData;
    const query = 'UPDATE Payments SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Xuất các phương thức
module.exports = {
    create: createPayment,
    getById: getPaymentById,
    update: updatePayment,
};
