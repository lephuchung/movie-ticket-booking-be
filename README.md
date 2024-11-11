
# Movie Theater API

Movie Theater API là một RESTful API cho phép người dùng quản lý và lấy thông tin về phim, rạp chiếu phim, vé và các suất chiếu. Dưới đây là tài liệu chi tiết về các endpoint API trong dự án này.

## Mục lục

- [Cài đặt](#cài-đặt)
- [API Documentation](#api-documentation)
  - [Phim](#phim)
  - [Rạp](#rạp)
  - [Người dùng và Vé](#người-dùng-và-vé)

---

## Cài đặt

1. **Clone dự án** từ GitHub:
   ```bash
   git clone https://github.com/lephuchung/movie-ticket-booking-be.git
   ```
2. **Cài đặt các phụ thuộc**:
   ```bash
   npm install
   ```
3. **Chạy server**:
   ```bash
   node app.js
   ```

---

## API Documentation

### Phim

1. **Lấy tất cả những phim đang chiếu**
   - **Endpoint**: `GET /movies/now_showing`
   - **Mô tả**: Lấy danh sách tất cả các phim đang chiếu.
   - **Trả về**: Mảng các đối tượng phim.

2. **Lấy tất cả những phim đang chiếu theo thể loại**
   - **Endpoint**: `GET /movies/now_showing/:genre`
   - **Tham số**:
     - `genre` (string): Tên thể loại phim.
   - **Mô tả**: Lấy danh sách các phim theo thể loại.
   - **Trả về**: Mảng các đối tượng phim.

3. **Lấy tất cả các thể loại phim**
   - **Endpoint**: `GET /movies/genres`
   - **Mô tả**: Lấy danh sách các thể loại phim.
   - **Trả về**: Mảng các đối tượng thể loại phim.

4. **Lấy thông tin chi tiết của một phim**
   - **Endpoint**: `GET /movies/details/:title`
   - **Tham số**:
     - `title` (string): Tên phim.
   - **Mô tả**: Lấy thông tin chi tiết về một phim.
   - **Trả về**: Đối tượng phim.

### Rạp

5. **Lấy các tỉnh có rạp chiếu phim**
   - **Endpoint**: `GET /movies/locations`
   - **Mô tả**: Lấy danh sách các tỉnh có rạp chiếu phim.
   - **Trả về**: Mảng các đối tượng tỉnh.

6. **Lấy các phim đang chiếu tại một tỉnh**
   - **Endpoint**: `GET /movies/now_showing/location/:location`
   - **Tham số**:
     - `location` (string): Tên tỉnh.
   - **Mô tả**: Lấy danh sách phim đang chiếu tại một tỉnh.
   - **Trả về**: Mảng các đối tượng phim.

7. **Lấy các rạp tại một tỉnh**
   - **Endpoint**: `GET /movies/location/:location`
   - **Tham số**:
     - `location` (string): Tên tỉnh.
   - **Mô tả**: Lấy danh sách các rạp tại một tỉnh.
   - **Trả về**: Mảng các đối tượng rạp.

8. **Lấy các rạp đang chiếu một phim tại một tỉnh**
   - **Endpoint**: `GET /movies/showing_movie/:location/:title`
   - **Tham số**:
     - `location` (string): Tên tỉnh.
     - `title` (string): Tên phim.
   - **Mô tả**: Lấy danh sách các rạp đang chiếu một phim tại một tỉnh.
   - **Trả về**: Mảng các đối tượng rạp.

9. **Lấy các rạp đang chiếu một phim trên cả nước**
   - **Endpoint**: `GET /movies/showing_movie/:title`
   - **Tham số**:
     - `title` (string): Tên phim.
   - **Mô tả**: Lấy danh sách các rạp đang chiếu một phim trên cả nước.
   - **Trả về**: Mảng các đối tượng rạp.

10. **Lấy các suất chiếu cho một phim tại một rạp trong khoảng thời gian**
    - **Endpoint**: `GET /movies/showtimes/:title/:theater/:startTime/:endTime`
    - **Tham số**:
      - `title` (string): Tên phim.
      - `theater` (string): Tên rạp.
      - `startTime` (string): Thời gian bắt đầu (ISO format).
      - `endTime` (string): Thời gian kết thúc (ISO format).
    - **Mô tả**: Lấy danh sách các suất chiếu cho một phim tại một rạp trong khoảng thời gian.
    - **Trả về**: Mảng các đối tượng suất chiếu.

11. **Lấy các suất chiếu cho một phim tại các rạp của một tỉnh trong khoảng thời gian**
    - **Endpoint**: `GET /movies/showtimes/location/:title/:location/:startTime/:endTime`
    - **Tham số**:
      - `title` (string): Tên phim.
      - `location` (string): Tên tỉnh.
      - `startTime` (string): Thời gian bắt đầu (ISO format).
      - `endTime` (string): Thời gian kết thúc (ISO format).
    - **Mô tả**: Lấy danh sách các suất chiếu cho một phim tại các rạp của một tỉnh trong khoảng thời gian.
    - **Trả về**: Mảng các đối tượng suất chiếu.

12. **Lấy các suất chiếu cho một phim tại các rạp trên cả nước trong khoảng thời gian**
    - **Endpoint**: `GET /movies/showtimes/:title/:startTime/:endTime`
    - **Tham số**:
      - `title` (string): Tên phim.
      - `startTime` (string): Thời gian bắt đầu (ISO format).
      - `endTime` (string): Thời gian kết thúc (ISO format).
    - **Mô tả**: Lấy danh sách các suất chiếu cho một phim tại tất cả các rạp trên cả nước trong khoảng thời gian.
    - **Trả về**: Mảng các đối tượng suất chiếu.

### Người dùng và Vé

13. **Lấy thông tin một tài khoản**
    - **Endpoint**: `GET /users/:username`
    - **Tham số**:
      - `username` (string): Tên tài khoản.
    - **Mô tả**: Lấy thông tin chi tiết của một tài khoản.
    - **Trả về**: Đối tượng thông tin tài khoản.

14. **Lấy lịch sử đặt vé của khách hàng**
    - **Endpoint**: `GET /users/:username/tickets`
    - **Tham số**:
      - `username` (string): Tên tài khoản.
    - **Mô tả**: Lấy danh sách các vé đã đặt của một tài khoản người dùng.
    - **Trả về**: Mảng các đối tượng vé đã đặt.

15. **Lấy thông tin chi tiết của một vé**
    - **Endpoint**: `GET /users/ticket/:ticketId`
    - **Tham số**:
      - `ticketId` (string): Mã vé.
    - **Mô tả**: Lấy thông tin chi tiết của một vé.
    - **Trả về**: Đối tượng thông tin vé.

---

## Định dạng trả về
Tất cả các API trả về dữ liệu ở định dạng JSON.

- **Mảng các đối tượng**: Khi có nhiều mục (phim, rạp, vé, v.v.).
- **Đối tượng đơn**: Khi chỉ có một mục cụ thể (một phim, một tài khoản, một vé, v.v.).

## Thông tin thêm
Nếu có bất kỳ câu hỏi hoặc gặp vấn đề trong quá trình sử dụng, vui lòng liên hệ với nhóm phát triển.
