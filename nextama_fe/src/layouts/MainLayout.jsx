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
// import MainMenuTabs from '@/components/MainMenuTabs';
import { motion } from 'framer-motion';

const MainLayout = () => {
  const { currentUser, logout } = useAuth();
  const { cartCount } = useShoppingCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 transition-colors duration-300">
      <header className="sticky top-0 z-50 shadow-md glassmorphism">
        <div className="container mx-auto px-4">
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

          <div className="flex justify-between items-center py-3">
            <Link to="/" className="flex items-center text-3xl font-bold">
              {/* Dùng thẻ img nếu ảnh tĩnh trong public folder */}
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
                      <Image
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                          currentUser.name || currentUser.email
                        )}`}
                        alt="avatar người dùng"
                        width={32}
                        height={32}
                        className="rounded-full border border-primary"
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
                        <Package className="mr-2 h-4 w-4" /> Đơn Mua
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

          <nav className="flex space-x-6 py-2 border-t border-border/50 text-sm">
            {[
              'Điện thoại',
              'Laptop',
              'Thời trang nam',
              'Thời trang nữ',
              'Đồ gia dụng',
              'Sức khỏe & Sắc đẹp',
            ].map((item) => (
              <NavLink
                key={item}
                to={`/category/${item
                  .toLowerCase()
                  .replace(/ & /g, '-')
                  .replace(/ /g, '-')}`}
                className={({ isActive }) =>
                  `hover:text-primary transition-colors pb-1 ${
                    isActive ? 'text-primary border-b-2 border-primary font-semibold' : 'text-muted-foreground'
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
            <NavLink
              to="/flash-sale"
              className={({ isActive }) =>
                `hover:text-primary transition-colors pb-1 text-red-500 font-semibold ${
                  isActive ? 'border-b-2 border-red-500' : ''
                }`
              }
            >
              Flash Sale
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-4 px-4">
        <Outlet />
      </main>

      <footer className="bg-muted text-muted-foreground py-8 text-center text-xs select-none">
        &copy; 2023 ShopeeCharm. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
