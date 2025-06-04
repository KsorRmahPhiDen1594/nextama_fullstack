import React from 'react';
    import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
    import { BarChart2, Users, Package, ShoppingCart as ShoppingCartIcon, CreditCard, Tag, FileText, HelpCircle, Bell, Settings, PenTool, LogOut, Sun, Moon, Building2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useAuth } from '@/contexts/AuthContext';
    import { useTheme } from '@/contexts/ThemeContext';
    import { motion } from 'framer-motion';

    const AdminLayout = ({ children }) => {
      const { currentUser, logout } = useAuth();
      const { theme, toggleTheme } = useTheme();
      const navigate = useNavigate();

      const navItems = [
        { name: "Dashboard", icon: BarChart2, path: "/admin/dashboard" },
        { name: "Người dùng", icon: Users, path: "/admin/users" },
        { name: "Sản phẩm", icon: Package, path: "/admin/products" },
        { name: "Đơn hàng", icon: ShoppingCartIcon, path: "/admin/orders" },
        { name: "Thanh toán", icon: CreditCard, path: "/admin/payments" },
        { name: "Khuyến mãi", icon: Tag, path: "/admin/promotions" },
        { name: "Báo cáo", icon: FileText, path: "/admin/reports" },
        { name: "Hỗ trợ", icon: HelpCircle, path: "/admin/support" },
        { name: "Thông báo", icon: Bell, path: "/admin/notifications" },
        { name: "Nội dung & CMS", icon: PenTool, path: "/admin/cms" },
        { name: "Cấu hình hệ thống", icon: Settings, path: "/admin/config" },
      ];

      const handleLogout = () => {
        logout();
        navigate('/admin/login');
      };

      return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <motion.aside 
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="w-64 bg-gray-800 dark:bg-slate-900 text-gray-100 p-4 flex flex-col shadow-lg"
          >
            <Link to="/admin/dashboard" className="flex items-center justify-center text-2xl font-bold text-center mb-8 gradient-shopee bg-clip-text text-transparent">
              <Building2 className="h-7 w-7 mr-2 text-primary" />
              Admin Panel
            </Link>
            <nav className="flex-grow space-y-1.5">
              {navItems.map(item => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-gray-700 dark:hover:bg-slate-700 transition-colors text-sm ${
                      isActive ? "bg-primary text-primary-foreground font-semibold shadow-sm" : "hover:text-white"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto pt-4 border-t border-gray-700 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                {currentUser && (
                  <div className="flex items-center space-x-2 text-sm">
                     <img  src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name || currentUser.email}`} alt="admin avatar" className="h-7 w-7 rounded-full border-2 border-primary" />
                    <span>{currentUser.name}</span>
                  </div>
                )}
                <Button onClick={toggleTheme} variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white">
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </div>
              <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-red-400 hover:bg-red-500/20 hover:text-red-300">
                <LogOut className="mr-3 h-5 w-5"/> Đăng xuất
              </Button>
            </div>
          </motion.aside>
          <main className="flex-grow p-6 md:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      );
    };

    export default AdminLayout;