const movieModel = require('../models/movieModel'); // Import model để truy vấn cơ sở dữ liệu

// Controller cho API lấy tất cả các phim đang chiếu
exports.getNowShowing = (req, res) => {
    movieModel.getNowShowing((err, result) => {
        if (err) return res.status(500).json({ error: err }); // Trả về lỗi nếu có
        res.json(result); // Trả về kết quả là mảng các phim
    });
};

// Controller cho API lấy phim theo thể loại
exports.getMoviesByGenre = (req, res) => {
    movieModel.getMoviesByGenre(req.params.genre, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Controller cho API lấy tất cả các thể loại phim
exports.getGenres = (req, res) => {
    movieModel.getGenres((err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Controller cho API lấy chi tiết một phim theo tiêu đề
exports.getMovieDetails = (req, res) => {
    movieModel.getMovieDetails(req.params.title, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]); // Trả về một đối tượng phim
    });
};

// Controller cho API lấy danh sách các tỉnh có rạp
exports.getLocations = (req, res) => {
    movieModel.getLocations((err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Controller cho API lấy phim đang chiếu tại một tỉnh
exports.getMoviesByLocation = (req, res) => {
    movieModel.getMoviesByLocation(req.params.location, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Controller cho API lấy các rạp tại một tỉnh
exports.getTheatersByLocation = (req, res) => {
    movieModel.getTheatersByLocation(req.params.location, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Controller cho API lấy các rạp chiếu một phim tại một tỉnh
exports.getTheatersShowingMovieInLocation = (req, res) => {
    const { location, title } = req.params;
    movieModel.getTheatersShowingMovieInLocation(location, title, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Controller cho API lấy các rạp chiếu một phim trên toàn quốc
exports.getTheatersShowingMovieNationwide = (req, res) => {
    movieModel.getTheatersShowingMovieNationwide(req.params.title, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Controller cho API lấy các suất chiếu cho một phim tại một rạp trong khoảng thời gian
exports.getShowtimesByMovieTheaterAndTimeRange = (req, res) => {
    const { title, theater, startTime, endTime } = req.params;
    movieModel.getShowtimesByMovieTheaterAndTimeRange(title, theater, startTime, endTime, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Controller cho API lấy các suất chiếu cho một phim tại các rạp của một tỉnh trong khoảng thời gian
exports.getShowtimesByMovieLocationAndTimeRange = (req, res) => {
    const { title, location, startTime, endTime } = req.params;
    movieModel.getShowtimesByMovieLocationAndTimeRange(title, location, startTime, endTime, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Controller cho API lấy các suất chiếu cho một phim tại các rạp trên cả nước trong khoảng thời gian
exports.getShowtimesByMovieNationwideAndTimeRange = (req, res) => {
    const { title, startTime, endTime } = req.params;
    movieModel.getShowtimesByMovieNationwideAndTimeRange(title, startTime, endTime, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};
