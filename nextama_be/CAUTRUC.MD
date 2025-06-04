<!-- 
  /nextama_be
    /config                  # Cấu hình (database, môi trường, v.v.)
    │   db.js                 # Kết nối MongoDB
    │   config.js             # Các biến cấu hình chung (nếu cần)
    /controllers             # Xử lý logic cho các route
    │   authController.js     # Xử lý đăng nhập, đăng ký (user, admin)
    │   productController.js  # Quản lý sản phẩm (thêm, sửa, xóa, xem)
    │   orderController.js    # Quản lý đơn hàng (tạo, cập nhật, xem)
    │   userController.js     # Quản lý người dùng (hồ sơ, cập nhật)
    │   cartController.js     # Quản lý giỏ hàng
    │   wishlistController.js # Quản lý danh sách yêu thích
    │   adminController.js    # Xử lý logic cho admin (dashboard, quản lý)
    /models                  # Mô hình MongoDB
    │   User.js               # Mô hình người dùng (user, admin, seller)
    │   Product.js            # Mô hình sản phẩm
    │   Order.js              # Mô hình đơn hàng
    │   Cart.js               # Mô hình giỏ hàng
    │   Wishlist.js           # Mô hình danh sách yêu thích
    /routes                  # Định nghĩa route API
    │   auth.js               # Route cho xác thực (đăng nhập, đăng ký)
    │   product.js            # Route cho sản phẩm
    │   order.js              # Route cho đơn hàng
    │   user.js               # Route cho người dùng
    │   cart.js               # Route cho giỏ hàng
    │   wishlist.js           # Route cho danh sách yêu thích
    │   admin.js              # Route cho admin (dashboard, quản lý)
    /middleware              # Middleware (xác thực, lỗi, v.v.)
    │   authMiddleware.js     # Xác thực JWT, phân quyền (user, admin)
    │   errorMiddleware.js    # Xử lý lỗi chung
    │   validation.js         # Kiểm tra dữ liệu đầu vào
    /utils                   # Hàm tiện ích
    │   logger.js             # Ghi log (dùng morgan hoặc tùy chỉnh)
    │   response.js           # Hàm trả về response (thành công, lỗi)
    /tests                   # Test case (tùy chọn)
    │   auth.test.js          # Test cho xác thực
    │   product.test.js       # Test cho sản phẩm
    │   order.test.js         # Test cho đơn hàng
    index.js                 # File chính, khởi động server
    .env                     # Biến môi trường (PORT, MONGO_URI, v.v.)
    package.json             # Cấu hình dự án, dependencies
    nodemon.json             # Cấu hình Nodemon cho phát triển
    README.md                # Hướng dẫn dự án
 -->