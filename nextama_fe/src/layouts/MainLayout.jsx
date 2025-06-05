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
  Video,
  PenTool,
  Monitor,
  Music,
  Image,
  Cpu,
  Zap,
  ChevronDown,
  Grid3X3,
  Gamepad2,
  Code,
  Camera,
  BookOpen,
  Shield,
  Smartphone,
  Cloud,
  Database,
  Palette,
  Headphones,
  Globe,
  Mail,
  Calendar,
  FileText,
  Settings,
  Zap as Lightning,
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
import Footer from '../pages/Footer';

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

  // Danh sách các danh mục được sắp xếp theo nhóm
  const categoryGroups = [
    {
      title: "Streaming & Media",
      categories: [
        { name: 'Netflix', path: 'Netflix', icon: Video },
        { name: 'Spotify', path: 'Spotify', icon: Music },
        { name: 'Figma', path: 'Figma', icon: Palette }
      ]
    },
    {
      title: "Design & Creative",
      categories: [
        { name: 'Adobe', path: 'Adobe', icon: PenTool },
        { name: 'Canva', path: 'Canva', icon: Image },
        { name: 'Figma', path: 'Figma', icon: Palette }
      ]
    },
    {
      title: "Productivity",
      categories: [
        { name: 'Microsoft', path: 'Microsoft', icon: Monitor },
        { name: 'Google Workspace', path: 'Google', icon: Search },
        { name: 'Notion', path: 'Notion', icon: BookOpen }
      ]
    },
    {
      title: "Development",
      categories: [
        { name: 'GitHub', path: 'GitHub', icon: Code },
        { name: 'GitLab', path: 'GitLab', icon: Code },
        { name: 'AWS', path: 'AWS', icon: Cloud }
      ]
    },
    {
      title: "AI & Tools",
      categories: [
        { name: 'ChatGPT', path: 'ChatGPT', icon: Cpu },
        { name: 'Midjourney', path: 'Midjourney', icon: Image },
        { name: 'Claude', path: 'Claude', icon: Cpu }
      ]
    },
    {
      title: "Security & VPN",
      categories: [
        { name: 'NordVPN', path: 'NordVPN', icon: Shield },
        { name: 'ExpressVPN', path: 'ExpressVPN', icon: Shield },
        { name: 'Malwarebytes', path: 'Malwarebytes', icon: Shield }
      ]
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLoading(true);
      navigate(`/category?search=${encodeURIComponent(searchTerm.trim())}`);
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryPath) => {
    navigate(`/category/${categoryPath}`);
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

          {/* Navigation Menu - MEGA MENU NGANG */}
          <nav className="flex items-center space-x-6 py-2 border-t border-border/50 text-sm overflow-x-auto">
            {/* Mega Menu cho Danh mục */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-1 text-lg font-semibold hover:text-primary transition-colors"
                >
                  <Grid3X3 className="h-5 w-5" />
                  <span>Danh mục</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-screen max-w-6xl p-6"
                sideOffset={5}
              >
                
                {/* Grid Layout cho các nhóm danh mục */}
                <div className="grid grid-cols-6 gap-6">
                  {categoryGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-3">
                      <h4 className="font-semibold text-sm text-primary border-b border-primary/20 pb-2">
                        {group.title}
                      </h4>
                      <div className="space-y-2">
                        {group.categories.map(({ name, path, icon: Icon }) => (
                          <button
                            key={name}
                            onClick={() => handleCategoryClick(path)}
                            className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors text-left group"
                          >
                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium group-hover:text-primary transition-colors">
                              {name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer của Mega Menu */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Link 
                        to="/categories/trending" 
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
                      >
                        <Lightning className="h-4 w-4" />
                        <span className="font-medium">Xu hướng</span>
                      </Link>
                      <Link 
                        to="/categories/new" 
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                      >
                        <Zap className="h-4 w-4" />
                        <span className="font-medium">Mới nhất</span>
                      </Link>
                    </div>
                    <Link 
                      to="/categories" 
                      className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
                    >
                      <span>Xem tất cả danh mục</span>
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </Link>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quick Links ngang */}
            <div className="flex items-center space-x-6">
              {/* Top Categories */}
              {[
                { name: 'Netflix', path: 'Netflix', icon: Video },
                { name: 'Adobe', path: 'Adobe', icon: PenTool },
                { name: 'Microsoft', path: 'Microsoft', icon: Monitor },
                { name: 'Spotify', path: 'Spotify', icon: Music },
                { name: 'AI Tools', path: 'Ai', icon: Cpu },
              ].map(({ name, path, icon: Icon }) => (
                <NavLink
                  key={name}
                  to={`/category/${path}`}
                  className={({ isActive }) =>
                    `flex items-center hover:text-primary transition-colors pb-1 whitespace-nowrap ${
                      isActive ? 'text-primary border-b-2 border-primary font-semibold' : 'text-muted-foreground'
                    }`
                  }
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {name}
                </NavLink>
              ))}
              
              {/* Special Links */}
              <NavLink
                to="/flash-sale"
                className={({ isActive }) =>
                  `flex items-center hover:text-red-600 transition-colors pb-1 text-red-500 font-semibold whitespace-nowrap ${
                    isActive ? 'border-b-2 border-red-500' : ''
                  }`
                }
              >
                <Zap className="h-4 w-4 mr-1" />
                Flash Sale
              </NavLink>

              <NavLink
                to="/deals"
                className={({ isActive }) =>
                  `flex items-center hover:text-green-600 transition-colors pb-1 text-green-500 font-semibold whitespace-nowrap ${
                    isActive ? 'border-b-2 border-green-500' : ''
                  }`
                }
              >
                <Lightning className="h-4 w-4 mr-1" />
                Ưu đãi
              </NavLink>

              <NavLink
                to="/bundles"
                className={({ isActive }) =>
                  `flex items-center hover:text-purple-600 transition-colors pb-1 text-purple-500 font-semibold whitespace-nowrap ${
                    isActive ? 'border-b-2 border-purple-500' : ''
                  }`
                }
              >
                <Package className="h-4 w-4 mr-1" />
                Combo
              </NavLink>

              <NavLink
                to="/gift-cards"
                className={({ isActive }) =>
                  `flex items-center hover:text-pink-600 transition-colors pb-1 text-pink-500 font-semibold whitespace-nowrap ${
                    isActive ? 'border-b-2 border-pink-500' : ''
                  }`
                }
              >
                <FileText className="h-4 w-4 mr-1" />
                Gift Cards
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-6 px-4">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;

