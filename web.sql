CREATE DATABASE IF NOT EXISTS MovieTheater;

USE MovieTheater;

CREATE TABLE Theaters (
    TheaterId VARCHAR(7) PRIMARY KEY,
    Name VARCHAR(255),
    TotalRoom INT,
    Location VARCHAR(255)
);

CREATE TABLE Room (
    RoomId VARCHAR (7) PRIMARY KEY,
    TotalSeat INT,
    Name VARCHAR(255),
    TheaterId VARCHAR(7),
    FOREIGN KEY (theaterId) REFERENCES Theaters(theaterId)
);

CREATE TABLE Seats (
    SeatId VARCHAR(7) PRIMARY KEY,
    SeatNumber VARCHAR(10),
    Status VARCHAR(20),
    SeatType VARCHAR(50),
    Tier VARCHAR(10),
    RoomId VARCHAR (7),
    FOREIGN KEY (roomId) REFERENCES Room(roomId)
);

CREATE TABLE Movies (
    MovieId VARCHAR(7) PRIMARY KEY,
    Title VARCHAR(255),
    Description TEXT,
    Genre VARCHAR(100),
    ReleaseDate DATETIME,
    Rating FLOAT,
    Duration INT,
    Director VARCHAR(255),
    PosterUrl VARCHAR(255)
);

CREATE TABLE Showtimes (
    ShowtimeId VARCHAR(10) PRIMARY KEY,
    StartTime DATETIME,
    EndTime DATETIME,
    SeatStatus VARCHAR(20),
    Price FLOAT,
    Name VARCHAR(255),
    TheaterId VARCHAR(7),
    RoomId VARCHAR(7),
    MovieId VARCHAR(7),
    FOREIGN KEY (theaterId) REFERENCES Theaters(theaterId),
    FOREIGN KEY (roomId) REFERENCES Room(roomId),
    FOREIGN KEY (movieId) REFERENCES Movies(movieId)
);

CREATE TABLE Users (
    UserId VARCHAR(9) PRIMARY KEY,
    Name VARCHAR(255),
    Password VARCHAR(255),
    Email VARCHAR(255),
    Phone VARCHAR(15),
    Role VARCHAR(50),
    CreateAt DATETIME,
    Status VARCHAR(20)
);

CREATE TABLE Payments (
    PaymentId VARCHAR(10) PRIMARY KEY,
    PaymentStatus VARCHAR(20),
    Amount FLOAT,
    PaymentTime DATETIME,
    PaymentMethod VARCHAR(50),
    UserId VARCHAR(9),
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE TABLE Tickets (
    TicketId VARCHAR(10) PRIMARY KEY,
    SeatNumber VARCHAR(10),
    BookingTime DATETIME,
    TotalPrice FLOAT,
    PaymentStatus VARCHAR(20),
    UserId VARCHAR(9),
    ShowtimeId VARCHAR(10),
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (showtimeId) REFERENCES Showtimes(showtimeId)
);

-- Thêm dữ liệu cho bảng Theaters
INSERT INTO Theaters (theaterId, name, totalRoom, location) VALUES
('CNM01', 'Galaxy Cinema', 5, 'Hà Nội'),
('CNM02', 'CineStar', 4, 'Hồ Chí Minh'),
('CNM03', 'Lotte Cinema', 6, 'Đà Nẵng');

-- Thêm dữ liệu cho bảng Room
INSERT INTO Room (roomId, totalSeat, name, theaterId) VALUES
('RID0101', 100, 'Room 1', 'CNM01'),
('RID0102', 100, 'Room 2', 'CNM01'),
('RID0103', 80, 'Room 3', 'CNM01'),
('RID0104', 80, 'Room 4', 'CNM01'),
('RID0105', 100, 'Room 5', 'CNM01'),
('RID0201', 80, 'Room 1', 'CNM02'),
('RID0202', 80, 'Room 2', 'CNM02'),
('RID0203', 100, 'Room 3', 'CNM02'),
('RID0204', 100, 'Room 4', 'CNM02'),
('RID0301', 100, 'Room 1', 'CNM03'),
('RID0302', 100, 'Room 2', 'CNM03'),
('RID0303', 90, 'Room 3', 'CNM03'),
('RID0304', 90, 'Room 4', 'CNM03'),
('RID0305', 90, 'Room 5', 'CNM03');

-- Thêm dữ liệu cho bảng Seats
INSERT INTO Seats (seatId, seatNumber, status, seatType, Tier, roomId) VALUES
('SID0101', 'A1', 'available', 'normal', 'A', 'RID0101'),
('SID0102', 'A2', 'available', 'normal', 'A', 'RID0101'),
('SID0103', 'B1', 'available', 'normal', 'B', 'RID0101'),
('SID0104', 'C1', 'available', 'normal', 'C', 'RID0101'),
('SID0201', 'A1', 'available', 'normal', 'A', 'RID0102'),
('SID0202', 'A2', 'available', 'normal', 'A', 'RID0102'),
('SID0203', 'B1', 'available', 'normal', 'B', 'RID0102'),
('SID0204', 'C1', 'available', 'normal', 'C', 'RID0102'),
('SID0301', 'A1', 'available', 'normal', 'A', 'RID0103'),
('SID0302', 'A2', 'available', 'normal', 'A', 'RID0103'),
('SID0303', 'B1', 'available', 'normal', 'B', 'RID0103'),
('SID0304', 'C1', 'available', 'normal', 'C', 'RID0103'),
('SID0401', 'A1', 'available', 'normal', 'A', 'RID0104'),
('SID0402', 'A2', 'available', 'normal', 'A', 'RID0104'),
('SID0403', 'B1', 'available', 'normal', 'B', 'RID0104'),
('SID0404', 'C1', 'available', 'normal', 'C', 'RID0104'),
('SID0501', 'A1', 'available', 'normal', 'A', 'RID0105'),
('SID0502', 'A2', 'available', 'normal', 'A', 'RID0105'),
('SID0503', 'B1', 'available', 'normal', 'B', 'RID0105'),
('SID0504', 'C1', 'available', 'normal', 'C', 'RID0105'),
('SID0601', 'A1', 'available', 'normal', 'A', 'RID0201'),
('SID0602', 'A2', 'available', 'normal', 'A', 'RID0201'),
('SID0603', 'B1', 'available', 'normal', 'B', 'RID0201'),
('SID0604', 'C1', 'available', 'normal', 'C', 'RID0201'),
('SID0701', 'A1', 'available', 'normal', 'A', 'RID0202'),
('SID0702', 'A2', 'available', 'normal', 'A', 'RID0202'),
('SID0703', 'B1', 'available', 'normal', 'B', 'RID0202'),
('SID0704', 'C1', 'available', 'normal', 'C', 'RID0202'),
('SID0801', 'A1', 'available', 'normal', 'A', 'RID0301'),
('SID0802', 'A2', 'available', 'normal', 'A', 'RID0301'),
('SID0803', 'B1', 'available', 'normal', 'B', 'RID0301'),
('SID0804', 'C1', 'available', 'normal', 'C', 'RID0301'),
('SID0901', 'A1', 'available', 'normal', 'A', 'RID0302'),
('SID0902', 'A2', 'available', 'normal', 'A', 'RID0302'),
('SID0903', 'B1', 'available', 'normal', 'B', 'RID0302'),
('SID0904', 'C1', 'available', 'normal', 'C', 'RID0302');

-- Thêm dữ liệu cho bảng Movies
INSERT INTO Movies (movieId, title, description, genre, releaseDate, rating, duration, director, posterUrl) VALUES
('MID001', 'Avengers: Endgame', 'The Avengers assemble once more to reverse Thanos\' actions.', 'Action', '2019-04-26', 8.4, 181, 'Anthony Russo', 'https://example.com/poster1.jpg'),
('MID002', 'Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology.', 'Sci-Fi', '2010-07-16', 8.8, 148, 'Christopher Nolan', 'https://example.com/poster2.jpg'),
('MID003', 'Parasite', 'A poor family schemes to become employed by a wealthy family.', 'Thriller', '2019-05-30', 8.6, 132, 'Bong Joon-ho', 'https://example.com/poster3.jpg'),
('MID004', 'The Lion King', 'A young lion prince flees his kingdom only to learn the true meaning of responsibility.', 'Animation', '2019-07-19 00:00:00', 8.5, 118, 'Jon Favreau', 'https://example.com/lionking_poster.jpg'),
('MID005', 'Titanic', 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', 'Romance', '1997-12-19 00:00:00', 7.8, 195, 'James Cameron', 'https://example.com/titanic_poster.jpg');

-- Thêm dữ liệu cho bảng Showtimes
INSERT INTO Showtimes (showtimeId, startTime, endTime, seatStatus, price, name, theaterId, roomId, movieId) VALUES
('STID0101', '2024-11-01 18:00:00', '2024-11-01 20:00:00', 'available', 100000, 'Avengers: Endgame', 'CNM01', 'RID0101', 'MID001'),
('STID0102', '2024-11-01 19:00:00', '2024-11-01 21:00:00', 'available', 100000, 'Avengers: Endgame', 'CNM01', 'RID0102', 'MID001'),
('STID0103', '2024-11-01 20:00:00', '2024-11-01 22:00:00', 'available', 90000, 'Avengers: Endgame', 'CNM01', 'RID0103', 'MID001'),
('STID0201', '2024-11-02 19:00:00', '2024-11-02 21:00:00', 'available', 120000, 'Inception', 'CNM02', 'RID0201', 'MID002'),
('STID0202', '2024-11-02 20:00:00', '2024-11-02 22:00:00', 'available', 120000, 'Inception', 'CNM02', 'RID0202', 'MID002'),
('STID0301', '2024-11-03 20:00:00', '2024-11-03 22:00:00', 'available', 90000, 'Parasite', 'CNM03', 'RID0301', 'MID003'),
('STID0302', '2024-11-03 20:30:00', '2024-11-03 22:30:00', 'available', 90000, 'Parasite', 'CNM03', 'RID0302', 'MID003'),
('STID0401', '2024-11-03 20:00:00', '2024-11-03 22:00:00', 'available', 100000, 'The Lion King', 'CNM01', 'RID0101', 'MID004'),
('STID0402', '2024-11-03 21:00:00', '2024-11-03 23:00:00', 'available', 100000, 'The Lion King', 'CNM01', 'RID0102', 'MID004'),
('STID0501', '2024-11-03 19:00:00', '2024-11-03 21:00:00', 'available', 100000, 'Titanic', 'CNM01', 'RID0101', 'MID005'),
('STID0502', '2024-11-03 20:00:00', '2024-11-03 22:00:00', 'available', 100000, 'Titanic', 'CNM01', 'RID0102', 'MID005');

-- Thêm dữ liệu cho bảng Users
INSERT INTO Users (userId, name, password, email, phone, role, createAt, status) VALUES
('UID0001', 'Nguyễn Văn A', '12345678', 'vana@example.com', '0123456789', 'customer', '2023-7-10', 'active'),
('UID0002', 'Trần Thị B', 'abcdefgh', 'thib@example.com', '0987654321', 'customer', '2023-08-01', 'active'),
('UID0003', 'Lê Thị C', '1234abcd', 'thic@example.com', '0969280280', 'customer', '2023-08-12', 'active'),
('UID0004', 'Chu Văn D', 'qwerty', 'vand@example.com', '0963099099', 'customer', '2023-08-15', 'active'),
('UID0005', 'Đinh Thị G', '12346789', 'thig@example.com', '0964868686', 'customer', '2023-08-20', 'active'),
('UID0006', 'Vũ Văn H', 'abcdefgh', 'vanh@example.com', '0986868686', 'customer', '2023-08-25', 'active');


-- Thêm dữ liệu cho bảng Payments
INSERT INTO Payments (paymentId, paymentStatus, amount, paymentTime, paymentMethod, userId) VALUES
('PID001', 'completed', 100000, '2024-10-31 18:00:00', 'cash', 'UID0001'),
('PID002', 'completed', 100000, '2024-11-01 12:00:30', 'visa credit', 'UID0002'),
('PID003', 'completed', 100000, '2024-11-01 13:00:00', 'cash', 'UID0003'),
('PID004', 'completed', 100000, '2024-11-01 15:00:30', 'cash', 'UID0004'),
('PID005', 'completed', 100000, '2024-11-01 18:00:00', 'cash', 'UID0005'),
('PID006', 'completed', 100000, '2024-11-01 19:00:30', 'visa credit', 'UID0006');

-- Thêm dữ liệu cho bảng Tickets
INSERT INTO Tickets (ticketId, seatNumber, bookingTime, totalPrice, paymentStatus, userId, showtimeId) VALUES
('TID001', 'A1', '2024-10-31 17:59:00', 100000, 'paid', 'UID0001', 'STID0101'),
('TID002', 'A2', '2024-11-01 12:00:00', 100000, 'paid', 'UID0002', 'STID0101'),
('TID003', 'B1', '2024-11-01 12:55:00', 100000, 'paid', 'UID0003', 'STID0101'),
('TID004', 'C1', '2024-11-01 15:00:00', 100000, 'paid', 'UID0004', 'STID0101'),
('TID005', 'A1', '2024-11-01 17:58:00', 100000, 'paid', 'UID0005', 'STID0102'),
('TID006', 'A2', '2024-11-01 19:00:00', 100000, 'paid', 'UID0006', 'STID0102');