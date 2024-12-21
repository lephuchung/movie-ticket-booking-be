const db = require('../db');

const RoomModel = {
    getAll: () => {
        const query = 'SELECT * FROM Room';
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    getById: (id) => {
        const query = 'SELECT * FROM Room WHERE RoomId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    create: (room) => {
        const query = 'INSERT INTO Room SET ?';
        return new Promise((resolve, reject) => {
            db.query(query, room, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    update: (id, room) => {
        const query = 'UPDATE Room SET ? WHERE RoomId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [room, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    delete: (id) => {
        const query = 'DELETE FROM Room WHERE RoomId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = RoomModel;
