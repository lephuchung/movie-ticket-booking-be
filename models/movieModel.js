const db = require('../db'); // Kết nối cơ sở dữ liệu

// Truy vấn SQL để lấy tất cả các phim đang chiếu
exports.getNowShowing = (callback) => {
    db.query('SELECT * FROM Movies', callback);
};

// Truy vấn SQL để lấy các phim theo thể loại
exports.getMoviesByGenre = (genre, callback) => {
    db.query('SELECT * FROM Movies WHERE Genre = ?', [genre], callback);
};

// Truy vấn SQL để lấy tất cả các thể loại phim
exports.getGenres = (callback) => {
    db.query('SELECT DISTINCT Genre FROM Movies', callback);
};

// Truy vấn SQL để lấy chi tiết của một phim theo tiêu đề
exports.getMovieDetails = (title, callback) => {
    db.query('SELECT * FROM Movies WHERE Title = ?', [title], callback);
};

// Truy vấn SQL để lấy danh sách các tỉnh có rạp
exports.getLocations = (callback) => {
    db.query('SELECT DISTINCT Location FROM Theaters', callback);
};

// Truy vấn SQL để lấy các phim đang chiếu tại một tỉnh
exports.getMoviesByLocation = (location, callback) => {
    const sql = `
        SELECT DISTINCT Movies.* FROM Movies 
        JOIN Showtimes ON Movies.MovieId = Showtimes.MovieId 
        JOIN Theaters ON Showtimes.TheaterId = Theaters.TheaterId 
        WHERE Theaters.Location = ?`;
    db.query(sql, [location], callback);
};

// Truy vấn SQL để lấy các rạp tại một tỉnh
exports.getTheatersByLocation = (location, callback) => {
    db.query('SELECT * FROM Theaters WHERE Location = ?', [location], callback);
};

// Truy vấn SQL để lấy các rạp chiếu một phim tại một tỉnh
exports.getTheatersShowingMovieInLocation = (location, title, callback) => {
    const sql = `
        SELECT Theaters.* FROM Theaters 
        JOIN Showtimes ON Theaters.TheaterId = Showtimes.TheaterId 
        JOIN Movies ON Showtimes.MovieId = Movies.MovieId 
        WHERE Theaters.Location = ? AND Movies.Title = ?`;
    db.query(sql, [location, title], callback);
};

// Truy vấn SQL để lấy các rạp chiếu một phim trên toàn quốc
exports.getTheatersShowingMovieNationwide = (title, callback) => {
    const sql = `
        SELECT DISTINCT Theaters.* FROM Theaters 
        JOIN Showtimes ON Theaters.TheaterId = Showtimes.TheaterId 
        JOIN Movies ON Showtimes.MovieId = Movies.MovieId 
        WHERE Movies.Title = ?`;
    db.query(sql, [title], callback);
};

// Truy vấn SQL để lấy các suất chiếu cho một phim tại một rạp trong khoảng thời gian
exports.getShowtimesByMovieTheaterAndTimeRange = (title, theater, startTime, endTime, callback) => {
    const sql = `
        SELECT Showtimes.* FROM Showtimes 
        JOIN Movies ON Showtimes.MovieId = Movies.MovieId 
        JOIN Theaters ON Showtimes.TheaterId = Theaters.TheaterId 
        WHERE Movies.Title = ? AND Theaters.Name = ? 
        AND Showtimes.StartTime >= ? AND Showtimes.EndTime <= ?`;
    db.query(sql, [title, theater, startTime, endTime], callback);
};

// Truy vấn SQL để lấy các suất chiếu cho một phim tại các rạp của một tỉnh trong khoảng thời gian
exports.getShowtimesByMovieLocationAndTimeRange = (title, location, startTime, endTime, callback) => {
    const sql = `
        SELECT Showtimes.* FROM Showtimes 
        JOIN Movies ON Showtimes.MovieId = Movies.MovieId 
        JOIN Theaters ON Showtimes.TheaterId = Theaters.TheaterId 
        WHERE Movies.Title = ? AND Theaters.Location = ? 
        AND Showtimes.StartTime >= ? AND Showtimes.EndTime <= ?`;
    db.query(sql, [title, location, startTime, endTime], callback);
};

// Truy vấn SQL để lấy các suất chiếu cho một phim tại các rạp trên cả nước trong khoảng thời gian
exports.getShowtimesByMovieNationwideAndTimeRange = (title, startTime, endTime, callback) => {
    const sql = `
        SELECT Showtimes.* FROM Showtimes 
        JOIN Movies ON Showtimes.MovieId = Movies.MovieId 
        WHERE Movies.Title = ? AND Showtimes.StartTime >= ? 
        AND Showtimes.EndTime <= ?`;
    db.query(sql, [title, startTime, endTime], callback);
};
