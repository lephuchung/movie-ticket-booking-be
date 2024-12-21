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
        const query = 'INSERT INTO Showtimes (ShowtimeId, MovieId, RoomId, ShowtimeTime, TicketPrice) VALUES (?, ?, ?, ?, ?)';
        const { ShowtimeId, MovieId, RoomId, ShowtimeTime, TicketPrice } = showtime;
        return new Promise((resolve, reject) => {
            db.query(query, [ShowtimeId, MovieId, RoomId, ShowtimeTime, TicketPrice], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    update: (id, showtime) => {
        const query = 'UPDATE Showtimes SET MovieId = ?, RoomId = ?, ShowtimeTime = ?, TicketPrice = ? WHERE ShowtimeId = ?';
        const { MovieId, RoomId, ShowtimeTime, TicketPrice } = showtime;
        return new Promise((resolve, reject) => {
            db.query(query, [MovieId, RoomId, ShowtimeTime, TicketPrice, id], (err, results) => {
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
