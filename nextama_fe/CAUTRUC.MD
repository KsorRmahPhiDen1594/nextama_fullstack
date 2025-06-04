<!-- 
amdin: 
admin@shopeecharm.com
adminpassword 

user:
den123@gmail.com
den123@gmail.com

-->

<!-- 
  /nextama_fe
    App.jsx                    # Component gốc của ứng dụng, chứa routing hoặc layout chính
    main.jsx                   # Điểm khởi chạy React, render <App /> vào DOM
    index.css                  # CSS toàn cục cho ứng dụng

    /components                # Các component tái sử dụng trong UI
      ChatWidget.jsx            # Widget chat hỗ trợ người dùng (live chat, chatbot)
      ProductCard.jsx           # Component hiển thị 1 sản phẩm dạng card
      ProductListItem.jsx       # Component hiển thị sản phẩm dạng danh sách
      ProtectedRoute.jsx        # Bảo vệ route, yêu cầu đăng nhập (admin, user)

      /ui                      # Component UI sử dụng shadcn/ui (đồng bộ UI toàn app)
        accordion.jsx            # Accordion (mở rộng/thu gọn nội dung)
        badge.jsx                # Thẻ nhỏ thể hiện trạng thái, nhãn
        button.jsx               # Button tuỳ chỉnh dùng trong toàn bộ app
        card.jsx                 # Card giao diện hộp nội dung
        checkbox.jsx             # Checkbox có style đồng bộ
        dialog.jsx               # Hộp thoại (modal) hiển thị nội dung phụ
        dropdown-menu.jsx        # Menu dropdown tùy chọn
        input.jsx                # Ô nhập liệu được thiết kế lại
        label.jsx                # Label đi kèm các input
        radio-group.jsx          # Nhóm radio button
        select.jsx               # Select menu tuỳ chỉnh
        slider.jsx               # Slider (dùng chọn giá trị theo dải)
        switch.jsx               # Toggle switch
        table.jsx                # Bảng dữ liệu tuỳ chỉnh
        tabs.jsx                 # Tabs chuyển đổi nội dung
        textarea.jsx             # Ô nhập nội dung nhiều dòng
        toast.jsx                # Component hiển thị thông báo
        toaster.jsx              # Container quản lý các toast
        use-toast.js             # Hook xử lý toast (hiển thị, ẩn, config)

    /contexts                  # Context API cho state toàn cục
      AuthContext.jsx           # Quản lý trạng thái đăng nhập (user/admin)
      ShoppingCartContext.jsx   # Quản lý giỏ hàng (thêm/xoá/sp)
      ThemeContext.jsx          # Quản lý dark/light theme
      WishlistContext.jsx       # Quản lý danh sách yêu thích

    /layouts                   # Layout dùng cho từng loại người dùng
      AdminLayout.jsx           # Giao diện bố cục cho admin (sidebar, nav)
      MainLayout.jsx            # Layout chính cho user

    /lib                       # Các thư viện, cấu hình bên ngoài
      supabase.js               # Cấu hình kết nối Supabase (nếu có dùng auth/db)
      utils.js                  # Các hàm tiện ích (định dạng, kiểm tra dữ liệu...)

    /pages                     # Các trang chính (dạng route)
      AboutPage.jsx             # Trang giới thiệu
      BecomeSellerPage.jsx      # Trang đăng ký trở thành người bán
      CartPage.jsx              # Trang giỏ hàng
      CategoryPage.jsx          # Trang hiển thị sản phẩm theo danh mục
      CheckoutPage.jsx          # Trang thanh toán
      HelpPage.jsx              # Trang trợ giúp người dùng
      HomePage.jsx              # Trang chủ
      LoginPage.jsx             # Trang đăng nhập
      NotFoundPage.jsx          # Trang 404 - không tìm thấy
      NotificationsPage.jsx     # Trang thông báo
      ProductDetailPage.jsx     # Trang chi tiết sản phẩm
      RegisterPage.jsx          # Trang đăng ký tài khoản
      TermsPage.jsx             # Điều khoản và chính sách
      UserAccountPage.jsx       # Trang quản lý tài khoản người dùng

      /admin                   # Các trang dành riêng cho admin
        AdminDashboardPage.jsx        # Trang tổng quan dashboard admin
        AdminLoginPage.jsx            # Trang đăng nhập cho admin
        AdminOrderManagementPage.jsx  # Trang quản lý đơn hàng
        AdminProductManagementPage.jsx# Trang quản lý sản phẩm
        AdminUserManagementPage.jsx   # Trang quản lý người dùng

  -->