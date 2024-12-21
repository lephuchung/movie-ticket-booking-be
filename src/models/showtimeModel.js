const db = require('../config/db');

const ShowtimeModel = {
    getAll: () => {
        const query = 'SELECT * FROM Showtimes';
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    getById: (id) => {
        const query = 'SELECT * FROM Showtimes WHERE ShowtimeId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    create: (showtime) => {
        const query = 'INSERT INTO Showtimes (ShowtimeId, StartTime, EndTime, SeatStatus, Price, TheaterId, RoomId, MovieId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const { ShowtimeId, StartTime, EndTime, SeatStatus, Price, TheaterId, RoomId, MovieId } = showtime;
        return new Promise((resolve, reject) => {
            db.query(query, [ShowtimeId, StartTime, EndTime, SeatStatus, Price, TheaterId, RoomId, MovieId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    update: (id, showtime) => {
        const query = 'UPDATE Showtimes SET StartTime = ?, EndTime = ?, SeatStatus = ?, Price = ?, TheaterId = ?, RoomId = ?, MovieId = ? WHERE ShowtimeId = ?';
        const { StartTime, EndTime, SeatStatus, Price, TheaterId, RoomId, MovieId } = showtime;
        return new Promise((resolve, reject) => {
            db.query(query, [StartTime, EndTime, SeatStatus, Price, TheaterId, RoomId, MovieId, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    delete: (id) => {
        const query = 'DELETE FROM Showtimes WHERE ShowtimeId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = ShowtimeModel;
