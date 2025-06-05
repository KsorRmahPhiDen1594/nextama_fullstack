import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground py-8 text-center text-xs select-none">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Chăm sóc khách hàng</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:text-primary">Trung tâm trợ giúp</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Liên hệ</Link></li>
              <li><Link to="/shipping" className="hover:text-primary">Hướng dẫn mua hàng</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Về NextAma</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary">Giới thiệu</Link></li>
              <li><Link to="/careers" className="hover:text-primary">Tuyển dụng</Link></li>
              <li><Link to="/press" className="hover:text-primary">Tin tức</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Thanh toán</h3>
            <ul className="space-y-2">
              <li><Link to="/payment" className="hover:text-primary">Phương thức thanh toán</Link></li>
              <li><Link to="/installment" className="hover:text-primary">Trả góp</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Theo dõi chúng tôi</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-primary">Facebook</Link></li>
              <li><Link to="#" className="hover:text-primary">Instagram</Link></li>
              <li><Link to="#" className="hover:text-primary">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6">
          <p>© 2024 NextAma. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
