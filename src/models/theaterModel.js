const db = require('../db');

const TheaterModel = {
    getAll: () => {
        const query = 'SELECT * FROM Theaters';
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    getById: (id) => {
        const query = 'SELECT * FROM Theaters WHERE TheaterId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    create: (theater) => {
        const query = 'INSERT INTO Theaters (TheaterId, Name, TotalRoom, Location) VALUES (?, ?, ?, ?)';
        const { TheaterId, Name, TotalRoom, Location } = theater;
        return new Promise((resolve, reject) => {
            db.query(query, [TheaterId, Name, TotalRoom, Location], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    update: (id, theater) => {
        const query = 'UPDATE Theaters SET Name = ?, TotalRoom = ?, Location = ? WHERE TheaterId = ?';
        const { Name, TotalRoom, Location } = theater;
        return new Promise((resolve, reject) => {
            db.query(query, [Name, TotalRoom, Location, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    delete: (id) => {
        const query = 'DELETE FROM Theaters WHERE TheaterId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = TheaterModel;