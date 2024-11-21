
# Quản lý suất chiếu phim - API

Đây là một dự án API được xây dựng bằng **Node.js** để quản lý suất chiếu phim cho hệ thống rạp chiếu. Dự án sử dụng **MySQL** làm cơ sở dữ liệu.

## Cấu trúc thư mục

```plaintext
movie-theater-api/
│
├── server.js                 # Tệp khởi động server
├── db.js                     # Cấu hình kết nối cơ sở dữ liệu
├── package.json              # Thông tin dự án và dependencies
│
├── routes/                   # Thư mục chứa các định tuyến API
│   └── showtimes.js          # API quản lý suất chiếu
│
├── controllers/              # Thư mục chứa logic xử lý
│   └── showtimes.js          # Controller cho suất chiếu
│
├── middleware/               # Middleware (tuỳ chọn, thêm khi cần)
│
├── README.md                 # Hướng dẫn sử dụng dự án
└── .gitignore                # Danh sách các tệp/thư mục cần bỏ qua khi dùng git
```

---

## Hướng dẫn cài đặt và sử dụng

### 1. Yêu cầu hệ thống

- Node.js >= 14.x
- MySQL (có thể sử dụng XAMPP)

---

### 2. Cài đặt dự án

#### Bước 1: Clone dự án
```bash
git clone <repo_url>
cd movie-theater-api
```

#### Bước 2: Cài đặt dependencies
```bash
npm install
```

#### Bước 3: Tạo cơ sở dữ liệu
1. Mở **XAMPP Control Panel** và chạy **MySQL**.
2. Truy cập **phpMyAdmin** tại `http://localhost/phpmyadmin`.
3. Tạo cơ sở dữ liệu tên `MovieTheater` và chạy các lệnh SQL trong file bạn đã cung cấp để tạo bảng và thêm dữ liệu mẫu.

#### Bước 4: Cấu hình cơ sở dữ liệu
- Mở file `db.js` và đảm bảo thông tin kết nối đúng:
  ```javascript
  const db = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: '',       // Thay bằng mật khẩu MySQL nếu có
      database: 'MovieTheater'
  });
  ```

#### Bước 5: Chạy server
```bash
node server.js
```
- Server sẽ chạy tại: `http://localhost:3000`.

---

### 3. API Endpoints

#### Tìm kiếm suất chiếu
- **URL**: `GET /api/showtimes/find`
- **Query Params**:
  - `movieId` (tuỳ chọn): Lọc theo mã phim.
  - `page` (tuỳ chọn): Số trang (mặc định: 1).
  - `limit` (tuỳ chọn): Số lượng bản ghi mỗi trang (mặc định: 10).
  - `sortBy` (tuỳ chọn): Cột sắp xếp (ví dụ: `price`, `startTime`).
  - `order` (tuỳ chọn): Thứ tự sắp xếp (`ASC` hoặc `DESC`).

#### Thêm suất chiếu
- **URL**: `POST /api/showtimes/add`
- **Body** (JSON):
  ```json
  {
      "showtimeId": "STID0601",
      "startTime": "2024-11-06 19:00:00",
      "endTime": "2024-11-06 21:00:00",
      "seatStatus": "available",
      "price": 120000,
      "name": "New Showtime",
      "theaterId": "CNM01",
      "roomId": "RID0101",
      "movieId": "MID001"
  }
  ```

#### Sửa suất chiếu
- **URL**: `PUT /api/showtimes/edit/:id`
- **Body** (JSON):
  ```json
  {
      "startTime": "2024-11-07 20:00:00",
      "endTime": "2024-11-07 22:00:00",
      "seatStatus": "sold_out",
      "price": 100000,
      "name": "Updated Showtime",
      "theaterId": "CNM01",
      "roomId": "RID0101",
      "movieId": "MID001"
  }
  ```

#### Xóa suất chiếu
- **URL**: `DELETE /api/showtimes/delete/:id`

---

## Lưu ý
- Nếu bạn gặp lỗi `ECONNREFUSED` khi kết nối MySQL, hãy chắc chắn rằng:
  - MySQL đang chạy (kiểm tra trên XAMPP).
  - Cấu hình `host`, `user`, `password`, và `database` trong `db.js` là chính xác.

---

## Kiểm thử API bằng Postman
1. Mở **Postman** và nhập các API ở trên.
2. Cấu hình `Body` hoặc `Query Params` theo yêu cầu.
3. Gửi yêu cầu và kiểm tra phản hồi.

---

## Giấy phép
Dự án này được phân phối dưới giấy phép MIT. Bạn có thể sử dụng, chỉnh sửa, và phân phối lại tự do.
