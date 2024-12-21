const db = require('../config/db');

const UserModel = {
    // Lấy danh sách tất cả người dùng
    getAll: () => {
        const query = 'SELECT * FROM Users';
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Lấy thông tin chi tiết một người dùng
    getById: (id) => {
        const query = 'SELECT * FROM Users WHERE UserId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    // Thêm một người dùng mới
    create: (user) => {
        const query = 'INSERT INTO Users (UserId, Name, Password, Email, Phone, Role, CreateAt, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const { UserId, Name, Password, Email, Phone, Role, CreateAt, Status } = user;
        return new Promise((resolve, reject) => {
            db.query(query, [UserId, Name, Password, Email, Phone, Role, CreateAt, Status], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Cập nhật thông tin người dùng
    update: (id, user) => {
        const query = 'UPDATE Users SET Name = ?, Password = ?, Email = ?, Phone = ?, Role = ?, CreateAt = ?, Status = ? WHERE UserId = ?';
        const { Name, Password, Email, Phone, Role, CreateAt, Status } = user;
        return new Promise((resolve, reject) => {
            db.query(query, [Name, Password, Email, Phone, Role, CreateAt, Status, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    // Xóa một người dùng
    delete: (id) => {
        const query = 'DELETE FROM Users WHERE UserId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = UserModel;
