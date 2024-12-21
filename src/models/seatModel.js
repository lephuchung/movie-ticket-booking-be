const db = require('../config/db');

const SeatModel = {
    getAll: () => {
        const query = 'SELECT * FROM Seats';
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    getById: (id) => {
        const query = 'SELECT * FROM Seats WHERE SeatId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    create: (seat) => {
        const query = 'INSERT INTO Seats (SeatId, SeatNumber, Line, RoomId) VALUES (?, ?, ?, ?)';
        const { SeatId, SeatNumber, Line, RoomId } = seat;
        return new Promise((resolve, reject) => {
            db.query(query, [SeatId, SeatNumber, Line, RoomId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    update: (id, seat) => {
        const query = 'UPDATE Seats SET SeatNumber = ?, Line = ?, RoomId = ? WHERE SeatId = ?';
        const { SeatNumber, Line, RoomId } = seat;
        return new Promise((resolve, reject) => {
            db.query(query, [SeatNumber, Line, RoomId, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    delete: (id) => {
        const query = 'DELETE FROM Seats WHERE SeatId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = SeatModel;
