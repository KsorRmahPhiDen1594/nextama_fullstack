import React from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  ShoppingCart,
  User,
  Package,
  Search,
  Bell,
  LogOut,
  Sun,
  Moon,
  MessageSquare,
  LifeBuoy,
  BadgeInfo as InfoIcon,
  FileText as FileTextIcon,
  Briefcase,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

// Giả lập hàm làm mới token (cần điều chỉnh theo backend thực tế)
async function refreshToken() {
  try {
    const response = await fetch('https://app.toolsngon.com/api/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: localStorage.getItem('refreshToken') }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Làm mới token thất bại');
    const data = await response.json();
    localStorage.setItem('token', data.access);
    return data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

// Hàm kiểm tra và kết nối MetaMask
async function connectMetaMask() {
  if (typeof window.ethereum === 'undefined') {
    alert('Vui lòng cài đặt MetaMask từ https://metamask.io và thử lại!');
    return null;
  }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log('Đã kết nối MetaMask:', accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error('Lỗi kết nối MetaMask:', error);
    return null;
  }
}

const MainLayout = () => {
  const { currentUser, logout } = useAuth();
  const { cartCount } = useShoppingCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLoading(true);
      navigate(`/category?search=${encodeURIComponent(searchTerm.trim())}`);
      setLoading(false);
    }
  };

  // Ví dụ hàm gọi API với token
  const fetchUserData = async () => {
    setLoading(true);
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        token = await refreshToken();
      }
      const response = await fetch('https://app.toolsngon.com/api/subscriptions/packages/get-by-url/?url=http://localhost:5173', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          token = await refreshToken();
          const retry = await fetch('https://app.toolsngon.com/api/subscriptions/packages/get-by-url/?url=http://localhost:5173', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (!retry.ok) throw new Error(`Lỗi: ${retry.status}`);
          const data = await retry.json();
          console.log('Dữ liệu:', data);
          return data;
        }
        throw new Error(`Lỗi: ${response.status}`);
      }
      const data = await response.json();
      console.log('Dữ liệu:', data);
      return data;
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount (ví dụ)
  React.useEffect(() => {
    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 transition-colors duration-300">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="text-white text-lg">Đang tải...</div>
        </div>
      )}
      
      <header className="sticky top-0 z-50 shadow-md glassmorphism">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex justify-between items-center py-2 text-xs text-muted-foreground">
            <div className="flex space-x-4">
              <Link to="/seller-centre" className="hover:text-primary">
                Kênh Người Bán
              </Link>
              <Link to="/download" className="hover:text-primary">
                Tải ứng dụng
              </Link>
            </div>
            <div className="flex space-x-4 items-center">
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  `flex items-center hover:text-primary ${isActive ? 'text-primary' : ''}`
                }
              >
                <Bell className="h-4 w-4 mr-1" /> Thông báo
              </NavLink>
              <Link to="/help" className="hover:text-primary flex items-center">
                <LifeBuoy className="h-4 w-4 mr-1" /> Hỗ trợ
              </Link>
              <Button onClick={toggleTheme} variant="ghost" size="icon" className="h-6 w-6">
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Main header */}
          <div className="flex justify-between items-center py-3">
            <Link to="/" className="flex items-center text-3xl font-bold">
              <img src="/assets/logoama.png" alt="logo" className="h-8 w-8 mr-2" />
              NextAma
            </Link>

            <form onSubmit={handleSearch} className="flex-grow max-w-xl mx-4 relative">
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm, thương hiệu, và mọi thứ..."
                className="w-full pl-4 pr-12 py-2.5 text-sm border-primary/50 focus:border-primary focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10 gradient-shopee text-primary-foreground"
                aria-label="Tìm kiếm"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-7 w-7" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 px-2 py-1" aria-label="User menu">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                          currentUser.name || currentUser.email
                        )}`}
                        alt="avatar người dùng"
                        className="rounded-full border border-primary w-8 h-8"
                      />
                      <span className="hidden md:inline text-sm font-medium">
                        {currentUser.name || currentUser.email}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Tài Khoản Của Tôi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/account/profile" className="w-full flex items-center">
                        <User className="mr-2 h-4 w-4" /> Hồ Sơ
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account/orders" className="w-full flex items-center">
                        <Package className="mr-2 h-4 w-4" /> Đơn Hàng
                      </Link>
                    </DropdownMenuItem>
                    {(currentUser.role === 'admin' || currentUser.role === 'superadmin') ? (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="w-full flex items-center">
                          <Building2 className="mr-2 h-4 w-4" /> Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link to="/seller-register" className="w-full flex items-center">
                          <Briefcase className="mr-2 h-4 w-4" /> Trở thành người bán
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-500 focus:bg-red-500/10 focus:text-red-600 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Đăng Xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" asChild>
                    <Link to="/login">Đăng Nhập</Link>
                  </Button>
                  <Button className="gradient-shopee text-primary-foreground" asChild>
                    <Link to="/register">Đăng Ký</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu - SỬA PHẦN NÀY */}
          <nav className="flex space-x-6 py-2 border-t border-border/50 text-sm overflow-x-auto">
            {[
              { name: 'Điện thoại', path: 'dien-thoai' },
              { name: 'Laptop', path: 'laptop' },
              { name: 'Thời trang nam', path: 'thoi-trang-nam' },
              { name: 'Thời trang nữ', path: 'thoi-trang-nu' },
              { name: 'Đồ gia dụng', path: 'do-gia-dung' },
              { name: 'Sức khỏe & Sắc đẹp', path: 'suc-khoe-sac-dep' },
            ].map((item) => (
              <NavLink
                key={item.name}
                to={`/category/${item.path}`}
                className={({ isActive }) =>
                  `hover:text-primary transition-colors pb-1 whitespace-nowrap ${
                    isActive ? 'text-primary border-b-2 border-primary font-semibold' : 'text-muted-foreground'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/flash-sale"
              className={({ isActive }) =>
                `hover:text-red-600 transition-colors pb-1 text-red-500 font-semibold whitespace-nowrap ${
                  isActive ? 'border-b-2 border-red-500' : ''
                }`
              }
            >
              Flash Sale
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-6 px-4">
        <Outlet />
      </main>

      {/* Footer */}
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
    </div>
  );
};

export default MainLayout;
