
# API Quản Lý Rạp Phim

Dự án này cung cấp các API phục vụ cho việc quản lý đăng nhập, đăng xuất và xác thực người dùng trong hệ thống rạp chiếu phim.

## 🛠 Công nghệ sử dụng
- **Node.js**: Runtime chính để chạy mã JavaScript trên server.
- **Express.js**: Framework để xây dựng API.
- **MySQL**: Cơ sở dữ liệu lưu trữ thông tin người dùng và rạp phim.
- **jsonwebtoken (JWT)**: Xử lý xác thực người dùng qua token.
- **bcrypt**: Mã hóa mật khẩu.
- **dotenv**: Quản lý biến môi trường.

## 📂 Cấu trúc thư mục
```
MOVIETHEATERAPI/
│
├── config/
│   └── db.js                # Kết nối cơ sở dữ liệu
│
├── controllers/
│   └── authController.js    # Xử lý đăng nhập, đăng xuất, làm mới token
│
├── middlewares/
│   └── authMiddleware.js    # Middleware xác thực token và kiểm tra quyền
│
├── .env                     # Biến môi trường (chứa thông tin nhạy cảm)
├── app.js                   # File chính khởi chạy ứng dụng
├── package.json             # Danh sách các thư viện sử dụng
└── README.md                # Tài liệu hướng dẫn dự án
```

## 🚀 Hướng dẫn cài đặt và chạy dự án

### 1. Cài đặt MySQL
- Cài đặt MySQL trên máy và tạo cơ sở dữ liệu theo tệp SQL mẫu.

### 2. Thiết lập môi trường
- Tạo file `.env` trong thư mục chính, thêm các thông số sau:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=MovieTheater
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
```

### 3. Cài đặt các thư viện
Chạy lệnh:
```bash
npm install
```

### 4. Chạy server
Chạy lệnh:
```bash
node app.js
```
Server sẽ khởi động tại [http://localhost:3000](http://localhost:3000).

## 🌐 API Endpoints

### **1. Đăng nhập**
- **URL:** `/login`
- **Phương thức:** `POST`
- **Dữ liệu gửi:**
  ```json
  {
    "identifier": "email hoặc số điện thoại",
    "password": "mật khẩu"
  }
  ```
- **Phản hồi:**
  ```json
  {
    "accessToken": "token truy cập",
    "refreshToken": "token làm mới"
  }
  ```

### **2. Đăng xuất**
- **URL:** `/logout`
- **Phương thức:** `POST`
- **Headers yêu cầu:** 
  - `Authorization: Bearer [accessToken]`
- **Phản hồi:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### **3. Làm mới AccessToken**
- **URL:** `/refreshAccessToken`
- **Phương thức:** `POST`
- **Dữ liệu gửi:**
  ```json
  {
    "refreshToken": "token làm mới"
  }
  ```
- **Phản hồi:**
  ```json
  {
    "accessToken": "token truy cập mới"
  }
  ```

### **4. API được bảo vệ**
- **URL:** `/protected`
- **Phương thức:** `GET`
- **Headers yêu cầu:** 
  - `Authorization: Bearer [accessToken]`
- **Phản hồi (thành công):**
  ```json
  {
    "message": "Welcome, [UserId]!"
  }
  ```
- **Phản hồi (khi token bị thu hồi):**
  ```json
  {
    "error": "Token has been revoked"
  }
  ```

## 🛡 Cơ chế bảo mật
- **JWT Tokens:** Sử dụng Access Token và Refresh Token để bảo vệ và duy trì phiên đăng nhập.
- **Thu hồi Token:** Token sẽ bị vô hiệu hóa ngay sau khi đăng xuất.
- **Mã hóa mật khẩu:** Mật khẩu người dùng được mã hóa bằng bcrypt.

## 💻 Các công cụ hỗ trợ
- **Postman:** Kiểm tra và gửi yêu cầu đến API.
- **XAMPP:** Quản lý và chạy MySQL server.

