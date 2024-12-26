const db = require('../config/db'); // Kết nối đến cơ sở dữ liệu

// Hàm tạo thanh toán mới
const createPayment = (paymentData, callback) => {
    const { PaymentStatus, Amount, PaymentMethod, UserId, PaymentId } = paymentData;
    const query = `
        INSERT INTO Payments (PaymentStatus, Amount, PaymentMethod, UserId, PaymentId) 
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [PaymentStatus, Amount, PaymentMethod, UserId, PaymentId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result); // Trả về kết quả, có thể dùng result.insertId để lấy ID mới
    });
};

// Hàm tìm thanh toán theo ID
const getById = (id, callback) => {
    const query = 'SELECT * FROM Payments WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result[0]); // Trả về kết quả đầu tiên (mảng chứa thông tin thanh toán)
    });
};

// Hàm cập nhật trạng thái thanh toán
const updatePayment = (id, updatedData, callback) => {
    const { PaymentStatus } = updatedData;
    const query = 'UPDATE Payments SET PaymentStatus = ? WHERE id = ?';
    db.query(query, [PaymentStatus, id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Xuất các phương thức
module.exports = {
    create: createPayment,
    getById: getById, // Đảm bảo xuất đúng tên hàm
    update: updatePayment,
};
