const db = require('../db');

// Find Showtimes with Pagination and Sorting
exports.findShowtimeWithPagination = (req, res) => {
    const {
        movieId,
        theaterId,
        roomId,
        startTime,
        endTime,
        name,
        page = 1,
        limit = 10,
        sortBy = 'startTime',
        order = 'ASC'
    } = req.query;

    let query = 'SELECT * FROM Showtimes WHERE 1=1';
    const params = [];

    if (movieId) {
        query += ' AND movieId = ?';
        params.push(movieId);
    }
    if (theaterId) {
        query += ' AND theaterId = ?';
        params.push(theaterId);
    }
    if (roomId) {
        query += ' AND roomId = ?';
        params.push(roomId);
    }
    if (startTime) {
        query += ' AND startTime >= ?';
        params.push(startTime);
    }
    if (endTime) {
        query += ' AND endTime <= ?';
        params.push(endTime);
    }
    if (name) {
        query += ' AND name LIKE ?';
        params.push(`%${name}%`);
    }

    const validSortColumns = ['startTime', 'endTime', 'price', 'name', 'theaterId', 'roomId', 'movieId'];
    const validOrders = ['ASC', 'DESC'];

    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'startTime';
    const sortOrder = validOrders.includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';

    query += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;
    const offset = (page - 1) * limit;
    params.push(parseInt(limit), parseInt(offset));

    db.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const countQuery = 'SELECT COUNT(*) AS total FROM Showtimes WHERE 1=1';
        db.query(countQuery, params.slice(0, -2), (err, countResults) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                total: countResults[0].total,
                page: parseInt(page),
                limit: parseInt(limit),
                sortBy: sortColumn,
                order: sortOrder,
                results
            });
        });
    });
};

// Add a new Showtime
exports.addShowtime = (req, res) => {
    const { showtimeId, startTime, endTime, seatStatus, price, name, theaterId, roomId, movieId } = req.body;
    const query = `
        INSERT INTO Showtimes (showtimeId, startTime, endTime, seatStatus, price, name, theaterId, roomId, movieId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
        query,
        [showtimeId, startTime, endTime, seatStatus, price, name, theaterId, roomId, movieId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Showtime added successfully', results });
        }
    );
};

// Edit an existing Showtime
exports.editShowtime = (req, res) => {
    const { id } = req.params;
    const { startTime, endTime, seatStatus, price, name, theaterId, roomId, movieId } = req.body;
    const query = `
        UPDATE Showtimes
        SET startTime = ?, endTime = ?, seatStatus = ?, price = ?, name = ?, theaterId = ?, roomId = ?, movieId = ?
        WHERE showtimeId = ?
    `;
    db.query(
        query,
        [startTime, endTime, seatStatus, price, name, theaterId, roomId, movieId, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Showtime updated successfully', results });
        }
    );
};

// Delete a Showtime
exports.deleteShowtime = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Showtimes WHERE showtimeId = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Showtime deleted successfully', results });
    });
};
