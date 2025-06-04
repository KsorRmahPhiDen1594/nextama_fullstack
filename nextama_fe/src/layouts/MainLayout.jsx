import React from 'react';
    import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
    import { Home, ShoppingCart, User, Package, Search, Bell, LogOut, Sun, Moon, MessageSquare, LifeBuoy, BadgeInfo as InfoIcon, FileText as FileTextIcon, Briefcase, Building2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Badge } from '@/components/ui/badge';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
    import { Input } from '@/components/ui/input';
    import { useAuth } from '@/contexts/AuthContext';
    import { useShoppingCart } from '@/contexts/ShoppingCartContext';
    import { useTheme } from '@/contexts/ThemeContext';
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
                  <Link to="/seller-centre" className="hover:text-primary">Kênh Người Bán</Link>
                  <Link to="/download" className="hover:text-primary">Tải ứng dụng</Link>
                </div>
                <div className="flex space-x-4 items-center">
                  <NavLink to="/notifications" className={({isActive}) => `flex items-center hover:text-primary ${isActive ? 'text-primary' : ''}`}>
                    <Bell className="h-4 w-4 mr-1" /> Thông báo
                  </NavLink>
                  <Link to="/help" className="hover:text-primary flex items-center"><LifeBuoy className="h-4 w-4 mr-1" /> Hỗ trợ</Link>
                  <Button onClick={toggleTheme} variant="ghost" size="icon" className="h-6 w-6">
                    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center py-3">
                <Link to="/" className="flex items-center text-3xl font-bold gradient-shopee bg-clip-text text-transparent">
                  <ShoppingCart className="h-8 w-8 mr-2 text-primary" />
                  ShopeeCharm
                </Link>
                <form onSubmit={handleSearch} className="flex-grow max-w-xl mx-4 relative">
                  <Input 
                    type="search" 
                    placeholder="Tìm kiếm sản phẩm, thương hiệu, và mọi thứ..." 
                    className="w-full pl-4 pr-12 py-2.5 text-sm border-primary/50 focus:border-primary focus:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10 gradient-shopee text-primary-foreground">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="relative" asChild>
                    <Link to="/cart">
                      <ShoppingCart className="h-7 w-7" />
                      {cartCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white">{cartCount}</Badge>
                      )}
                    </Link>
                  </Button>
                  {currentUser ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-2 px-2 py-1">
                           <img  src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name || currentUser.email}`} alt="avatar" className="h-8 w-8 rounded-full border border-primary" />
                          <span className="hidden md:inline text-sm font-medium">{currentUser.name || currentUser.email}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Tài Khoản Của Tôi</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link to="/account/profile" className="w-full flex items-center"><User className="mr-2 h-4 w-4" /> Hồ Sơ</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link to="/account/orders" className="w-full flex items-center"><Package className="mr-2 h-4 w-4" /> Đơn Mua</Link></DropdownMenuItem>
                        {currentUser.role === 'admin' || currentUser.role === 'superadmin' ? (
                          <DropdownMenuItem asChild><Link to="/admin/dashboard" className="w-full flex items-center"><Building2 className="mr-2 h-4 w-4" /> Admin Panel</Link></DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem asChild><Link to="/seller-register" className="w-full flex items-center"><Briefcase className="mr-2 h-4 w-4" /> Trở thành người bán</Link></DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="text-red-500 focus:bg-red-500/10 focus:text-red-600 cursor-pointer">
                          <LogOut className="mr-2 h-4 w-4" /> Đăng Xuất
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" asChild><Link to="/login">Đăng Nhập</Link></Button>
                      <Button className="gradient-shopee text-primary-foreground" asChild><Link to="/register">Đăng Ký</Link></Button>
                    </div>
                  )}
                </div>
              </div>
              <nav className="flex space-x-6 py-2 border-t border-border/50 text-sm">
                {['Điện thoại', 'Laptop', 'Thời trang nam', 'Thời trang nữ', 'Đồ gia dụng', 'Sức khỏe & Sắc đẹp'].map(item => (
                  <NavLink key={item} to={`/category/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
                    className={({isActive}) => `hover:text-primary transition-colors pb-1 ${isActive ? 'text-primary border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}>
                    {item}
                  </NavLink>
                ))}
                 <NavLink to="/flash-sale" className={({isActive}) => `hover:text-primary transition-colors pb-1 text-red-500 font-semibold ${isActive ? 'border-b-2 border-red-500' : ''}`}>
                    Flash Sale
                  </NavLink>
              </nav>
            </div>
          </header>
          <main className="flex-grow container mx-auto py-4 md:py-6 px-2 md:px-0">
            <Outlet />
          </main>
          <footer className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 py-12 mt-8 border-t dark:border-slate-700">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              <div>
                <span className="text-md font-semibold text-gray-800 dark:text-white block mb-3">Chăm sóc khách hàng</span>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/help" className="hover:text-primary transition-colors flex items-center"><LifeBuoy className="h-4 w-4 mr-2 opacity-70"/>Trung tâm trợ giúp</Link></li>
                  <li><Link to="/blog" className="hover:text-primary transition-colors flex items-center"><MessageSquare className="h-4 w-4 mr-2 opacity-70"/>ShopeeCharm Blog</Link></li>
                  <li><Link to="/mall" className="hover:text-primary transition-colors flex items-center"><ShoppingCart className="h-4 w-4 mr-2 opacity-70"/>ShopeeCharm Mall</Link></li>
                  <li><Link to="/how-to-buy" className="hover:text-primary transition-colors">Hướng dẫn mua hàng</Link></li>
                  <li><Link to="/how-to-sell" className="hover:text-primary transition-colors">Hướng dẫn bán hàng</Link></li>
                  <li><Link to="/payment" className="hover:text-primary transition-colors">Thanh toán</Link></li>
                  <li><Link to="/shipping" className="hover:text-primary transition-colors">Vận chuyển</Link></li>
                </ul>
              </div>
              <div>
                <span className="text-md font-semibold text-gray-800 dark:text-white block mb-3">Về ShopeeCharm</span>
                 <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="hover:text-primary transition-colors flex items-center"><InfoIcon className="h-4 w-4 mr-2 opacity-70"/>Giới thiệu</Link></li>
                  <li><Link to="/careers" className="hover:text-primary transition-colors flex items-center"><Briefcase className="h-4 w-4 mr-2 opacity-70"/>Tuyển dụng</Link></li>
                  <li><Link to="/terms" className="hover:text-primary transition-colors flex items-center"><FileTextIcon className="h-4 w-4 mr-2 opacity-70"/>Điều khoản</Link></li>
                  <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Chính sách bảo mật</Link></li>
                  <li><Link to="/genuine" className="hover:text-primary transition-colors">Chính hãng</Link></li>
                  <li><Link to="/seller-channel" className="hover:text-primary transition-colors">Kênh Người bán</Link></li>
                  <li><Link to="/flash-deals" className="hover:text-primary transition-colors">Flash Deals</Link></li>
                </ul>
              </div>
              <div>
                <span className="text-md font-semibold text-gray-800 dark:text-white block mb-3">Thanh toán</span>
                <div className="flex flex-wrap gap-2 items-center">
                  <img  alt="Visa" class="h-7" src="https://images.unsplash.com/photo-1585915473635-d4e5c564eec3" />
                  <img  alt="Mastercard" class="h-7" src="https://images.unsplash.com/photo-1608286022625-bc07f7a21154" />
                  <img  alt="JCB" class="h-7" src="https://images.unsplash.com/photo-1611416811039-e326d73a68d3" />
                  <img  alt="American Express" class="h-7" src="https://images.unsplash.com/photo-1649251855096-f8beda8f6b24" />
                  <img  alt="COD" class="h-7" src="https://images.unsplash.com/photo-1687199127283-2bb87b8a92fc" />
                  <img  alt="ShopeePay" class="h-7" src="https://images.unsplash.com/photo-1586880244543-0528a802be97" />
                  <img  alt="ZaloPay" class="h-7" src="https://images.unsplash.com/photo-1631005551113-6533834aefea" />
                  <img  alt="Momo" class="h-7" src="https://images.unsplash.com/photo-1556742208-999815fca738" />
                </div>
                <span className="text-md font-semibold text-gray-800 dark:text-white block mb-3 mt-4">Đơn vị vận chuyển</span>
                 <div className="flex flex-wrap gap-2 items-center">
                  <img  alt="Shopee Express" class="h-7" src="https://images.unsplash.com/photo-1703489583404-4ee76c06482b" />
                  <img  alt="GHTK" class="h-7" src="https://images.unsplash.com/photo-1666291631431-85cd843669ee" />
                  <img  alt="GHN" class="h-7" src="https://images.unsplash.com/photo-1591370017352-3014ad5b8055" />
                  <img  alt="Viettel Post" class="h-7" src="https://images.unsplash.com/photo-1597658847720-47d08e01e63c" />
                </div>
              </div>
              <div>
                <span className="text-md font-semibold text-gray-800 dark:text-white block mb-3">Theo dõi chúng tôi</span>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center"><svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-current opacity-70"><path d="M12 2.04c-5.5 0-10 4.49-10 10s4.5 10 10 10 10-4.49 10-10-4.5-10-10-10zm1.6 14.49h-3.2v-6.4h-1.6v-2.56h1.6v-1.92c0-1.27.56-3.2 3.2-3.2h2.4v2.56h-1.6c-.32 0-.48.16-.48.48v1.92h2.08l-.32 2.56h-1.76v6.4z"/></svg> Facebook</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center"><svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-current opacity-70"><path d="M17.34,5.46h-2.42c-1.53,0-1.82.72-1.82,1.78v2.09h4.07l-.53,4.11h-3.54V22h-4.21V13.44H5.93V9.33h2.91V6.11c0-2.89,1.77-4.47,4.35-4.47l3.68.02v3.8Z"/></svg> Instagram</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center"><svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-current opacity-70"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.9-.53 1.59-1.37 1.92-2.38-.84.5-1.78.86-2.79 1.07C18.27 4.34 17.03 4 15.65 4c-2.95 0-5.33 2.38-5.33 5.33 0 .42.05.83.14 1.22C6.9 10.36 3.65 8.56 1.5 5.78c-.47.81-.74 1.75-.74 2.74 0 1.85.94 3.48 2.38 4.43-.87-.03-1.69-.27-2.4-.66v.07c0 2.58 1.84 4.73 4.27 5.22-.45.12-.92.19-1.41.19-.34 0-.68-.03-1-.1C3.81 19.62 5.44 21 7.49 21c-1.83 1.44-4.13 2.29-6.66 2.29-.43 0-.86-.03-1.28-.08C1.48 22.41 3.92 24 6.71 24c8.06 0 12.47-6.68 12.47-12.47 0-.19 0-.38-.01-.56.86-.62 1.6-1.4 2.2-2.28z"/></svg> Twitter</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center"><svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-current opacity-70"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4.24,15.85c-1.41.78-3.49.88-4.08.62-.59-.26-.93-.77-.93-1.38V11.42c0-.61.34-1.12.93-1.38.59-.26,2.67-.36,4.08.62a.88.88,0,0,1,.43.76v3.67A.88.88,0,0,1,16.24,15.85ZM9.76,12.19v3.62c0,.15.07.28.18.33.11.05.24,0,.32-.07.78-.43,2.43-.48,3.21,0,.08.07.21.12.32.07.11-.05.18-.18.18-.33V12.19c0-.15-.07-.28-.18-.33s-.24,0-.32.07c-.78.43-2.43.48-3.21,0-.08-.07-.21-.12-.32-.07C9.83,11.91,9.76,12.04,9.76,12.19Z"/></svg> Youtube</a></li>
                </ul>
              </div>
               <div className="col-span-2 md:col-span-4 lg:col-span-1">
                <span className="text-md font-semibold text-gray-800 dark:text-white block mb-3">Tải ứng dụng ShopeeCharm</span>
                <div className="flex items-center space-x-2">
                  <img  alt="QR Code for app download" class="h-20 w-20 border p-0.5 rounded" src="https://images.unsplash.com/photo-1626682561113-d1db402cc866" />
                  <div className="flex flex-col space-y-1">
                    <a href="#" target="_blank" rel="noopener noreferrer"><img  alt="Download on App Store" class="h-10" src="https://images.unsplash.com/photo-1587573578335-9672da4d0292" /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><img  alt="Get it on Google Play" class="h-10" src="https://images.unsplash.com/photo-1648134859182-98df6e93ef58" /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><img  alt="Explore it on AppGallery" class="h-10" src="https://images.unsplash.com/photo-1583268921016-514d0a038478" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-xs text-gray-500 dark:text-gray-500 mt-10 border-t border-gray-200 dark:border-slate-700 pt-8">
              <p>© {new Date().getFullYear()} ShopeeCharm. Thiết kế bởi Horizons AI.</p>
              <p className="mt-1">Địa chỉ: Tầng 28, Tòa nhà trung tâm Lotte Hà Nội, 54 Liễu Giai, phường Cống Vị, Quận Ba Đình, Hà Nội.</p>
              <p className="mt-1">Tổng đài hỗ trợ: 19001221 - Email: cskh@shopeecharm.vn</p>
            </div>
          </footer>
        </div>
      );
    };

    export default MainLayout;