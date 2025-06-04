import React from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Badge } from '@/components/ui/badge';
    import { Switch } from '@/components/ui/switch';
    import { User, Package, DollarSign, Heart, Star as StarIcon, Settings, Edit3, LogOut, MapPin, Bell, CreditCard, Shield } from 'lucide-react';
    import { useAuth } from '@/contexts/AuthContext';
    import { useWishlist } from '@/contexts/WishlistContext';
    import ProductCard from '@/components/ProductCard';

    const UserAccountPage = () => {
      const { tab } = useParams();
      const navigate = useNavigate();
      const { currentUser, logout, setCurrentUser } = useAuth();
      const { wishlistItems, setWishlistItems } = useWishlist(); // Assuming setWishlistItems is for clearing on logout or similar
      
      const [userProfile, setUserProfile] = React.useState({
        name: currentUser?.name || "Người dùng ShopeeCharm",
        email: currentUser?.email || "user@example.com",
        phone: currentUser?.phone || "0987654321",
        avatar_placeholder: `Avatar của ${currentUser?.name || 'Người dùng'}`,
        shopeePayBalance: "1.500.000₫",
        addresses: [
          { id: 1, fullName: currentUser?.name || "Người dùng ShopeeCharm", phone: "0987654321", address: "123 Đường ABC, Phường XYZ, Quận 1", city: "TP.HCM", isDefault: true },
          { id: 2, fullName: currentUser?.name || "Người dùng ShopeeCharm", phone: "0912345678", address: "456 Đường DEF, Phường UVW, Quận Hai Bà Trưng", city: "Hà Nội", isDefault: false },
        ],
      });
      const [orderHistory, setOrderHistory] = React.useState([]);
      const [userReviews, setUserReviews] = React.useState([]);

      React.useEffect(() => {
        if (currentUser) {
            const storedOrders = JSON.parse(localStorage.getItem(`orders_${currentUser.id}`)) || [];
            setOrderHistory(storedOrders.sort((a,b) => new Date(b.date) - new Date(a.date)));
            // Mock user reviews for now
            setUserReviews([
                {id: "REV001", productId: "1", productName: "Áo Thun Cotton Cao Cấp", rating: 5, comment: "Sản phẩm tuyệt vời!", date: "2025-05-20"},
                {id: "REV002", productId: "2", productName: "Tai Nghe Bluetooth XYZ", rating: 4, comment: "Chất lượng âm thanh tốt, pin hơi nhanh hết.", date: "2025-05-18"},
            ]);
        }
      }, [currentUser]);


      const handleProfileUpdate = (e) => {
        e.preventDefault();
        // In a real app, this would call an API
        // For now, update localStorage if currentUser exists
        if (currentUser) {
            const updatedUser = { ...currentUser, name: userProfile.name, phone: userProfile.phone };
            setCurrentUser(updatedUser); // Update context
            localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Update localStorage for persistence
            // Update users array in localStorage as well
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.map(u => u.id === currentUser.id ? { ...u, name: userProfile.name, phone: userProfile.phone } : u);
            localStorage.setItem('users', JSON.stringify(users));
        }
        alert("Hồ sơ đã được cập nhật (mô phỏng)!");
      };
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prev => ({ ...prev, [name]: value }));
      };

      const tabsConfig = [
        { value: "profile", label: "Hồ Sơ", icon: User },
        { value: "addresses", label: "Địa Chỉ", icon: MapPin },
        { value: "orders", label: "Đơn Hàng", icon: Package },
        { value: "shopeepay", label: "Ví ShopeeCharmPay", icon: DollarSign },
        { value: "wishlist", label: "Yêu Thích", icon: Heart },
        { value: "reviews", label: "Đánh Giá", icon: StarIcon },
        { value: "notifications", label: "Thông Báo", icon: Bell },
        { value: "security", label: "Bảo Mật", icon: Shield },
        { value: "settings", label: "Cài Đặt Chung", icon: Settings },
      ];

      if (!currentUser) {
        navigate('/login');
        return null;
      }

      return (
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card dark:bg-slate-800 shadow-sm rounded-lg p-4 md:p-6 mb-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold">Tài Khoản Của Tôi</h1>
          </motion.div>
          
          <Tabs defaultValue={tab || "profile"} value={tab || "profile"} onValueChange={(value) => navigate(`/account/${value}`)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 mb-6 h-auto flex-wrap justify-start">
              {tabsConfig.map(t => (
                <TabsTrigger key={t.value} value={t.value} className="py-2.5 px-3 text-xs md:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
                  <t.icon className="mr-1.5 h-4 w-4" />{t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <TabsContent value="profile">
                <Card className="shadow-lg glassmorphism">
                  <CardHeader className="p-4 md:p-6 border-b">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                       <img  className="h-20 w-20 md:h-24 md:w-24 rounded-full border-2 border-primary p-1 object-cover" alt={userProfile.avatar_placeholder} src={`https://api.dicebear.com/7.x/initials/svg?seed=${userProfile.name || userProfile.email}&backgroundColor=ff7f50&textColor=ffffff&fontSize=40`} />
                      <div>
                        <CardTitle className="text-xl md:text-2xl">{userProfile.name}</CardTitle>
                        <CardDescription>{userProfile.email}</CardDescription>
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs text-primary mt-1">Thay đổi ảnh đại diện</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Tên hiển thị</Label>
                          <Input id="name" name="name" value={userProfile.name} onChange={handleInputChange} />
                        </div>
                        <div>
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input id="phone" name="phone" type="tel" value={userProfile.phone} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email_display">Email (không thể thay đổi)</Label>
                        <Input id="email_display" value={userProfile.email} disabled />
                      </div>
                      <Button type="submit" className="gradient-shopee text-primary-foreground">
                        <Edit3 className="mr-2 h-4 w-4" /> Cập nhật hồ sơ
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card className="shadow-lg">
                    <CardHeader className="p-4 md:p-6 border-b flex flex-row justify-between items-center">
                        <CardTitle>Sổ địa chỉ</CardTitle>
                        <Button size="sm"><MapPin className="mr-2 h-4 w-4"/>Thêm địa chỉ mới</Button>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 space-y-4">
                        {userProfile.addresses.map(addr => (
                            <Card key={addr.id} className={`p-4 ${addr.isDefault ? 'border-primary ring-1 ring-primary' : ''}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center mb-1">
                                            <span className="font-semibold">{addr.fullName}</span>
                                            <span className="text-muted-foreground mx-2">|</span>
                                            <span className="text-muted-foreground">{addr.phone}</span>
                                            {addr.isDefault && <Badge className="ml-3 text-xs">Mặc định</Badge>}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{addr.address}</p>
                                        <p className="text-sm text-muted-foreground">{addr.city}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 text-xs">
                                        <Button variant="link" size="sm" className="p-0 h-auto text-primary">Sửa</Button>
                                        {!addr.isDefault && <Button variant="link" size="sm" className="p-0 h-auto text-destructive">Xóa</Button>}
                                    </div>
                                </div>
                                {!addr.isDefault && <Button variant="outline" size="sm" className="mt-3 text-xs">Đặt làm mặc định</Button>}
                            </Card>
                        ))}
                    </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="shadow-lg">
                  <CardHeader className="p-4 md:p-6 border-b">
                    <CardTitle>Lịch sử đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    {orderHistory.length > 0 ? (
                      <div className="space-y-4">
                        {orderHistory.map(order => (
                          <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                              <div>
                                <p className="font-semibold text-primary">Mã đơn: {order.id}</p>
                                <p className="text-sm text-muted-foreground">Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')} ({order.items.length} sản phẩm)</p>
                                <p className="text-md font-medium">Tổng tiền: {order.totalAmount.toLocaleString()}₫</p>
                              </div>
                              <div className="mt-2 sm:mt-0 text-left sm:text-right">
                                <Badge variant={
                                  order.status === "Đã giao" ? "default" : 
                                  order.status === "Đang xử lý" ? "secondary" : 
                                  order.status === "Đã hủy" ? "destructive" : "outline"
                                } className={`mb-2 px-3 py-1 text-xs ${order.status === "Đã giao" ? 'bg-green-500 text-white' : ''}`}>{order.status}</Badge>
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/account/orders/${order.id}`}>Xem chi tiết</Link>
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">Bạn chưa có đơn hàng nào.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shopeepay">
                <Card className="shadow-lg">
                  <CardHeader className="p-4 md:p-6 border-b">
                    <CardTitle className="flex items-center justify-between">
                      Ví ShopeeCharmPay
                      <span className="text-2xl font-bold text-primary">{userProfile.shopeePayBalance}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <Button className="w-full" variant="outline"><DollarSign className="mr-2 h-4 w-4"/>Nạp tiền</Button>
                      <Button className="w-full" variant="outline">Rút tiền</Button>
                      <Button className="w-full" variant="outline">Chuyển tiền</Button>
                    </div>
                    <div className="pt-4">
                        <h3 className="font-semibold mb-2">Liên kết ngân hàng</h3>
                        <Button variant="soft" className="w-full border-dashed border-primary text-primary hover:bg-primary/10">
                            <CreditCard className="mr-2 h-4 w-4"/> Liên kết ngay
                        </Button>
                    </div>
                    <h3 className="font-semibold pt-4 border-t mt-4">Lịch sử giao dịch</h3>
                    <p className="text-muted-foreground text-center py-4">Chưa có giao dịch nào gần đây.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist">
                <Card className="shadow-lg">
                  <CardHeader className="p-4 md:p-6 border-b"><CardTitle>Danh sách yêu thích ({wishlistItems.length})</CardTitle></CardHeader>
                  <CardContent className="p-4 md:p-6">
                    {wishlistItems.length > 0 ? (
                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {wishlistItems.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">Bạn chưa có sản phẩm yêu thích nào. Hãy <Link to="/" className="text-primary hover:underline">khám phá</Link> thêm nhé!</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="shadow-lg">
                  <CardHeader className="p-4 md:p-6 border-b"><CardTitle>Đánh giá của tôi</CardTitle></CardHeader>
                  <CardContent className="p-4 md:p-6">
                     {userReviews.length > 0 ? (
                        <div className="space-y-4">
                            {userReviews.map(review => (
                                <Card key={review.id} className="p-3">
                                    <p className="font-semibold text-sm mb-0.5">Đánh giá cho sản phẩm: <Link to={`/product/${review.productId}`} className="text-primary hover:underline">{review.productName}</Link></p>
                                    <div className="flex items-center my-1">
                                      {Array(5).fill(0).map((_, i) => <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                                    </div>
                                    <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                                    <p className="text-xs text-muted-foreground mt-1">Ngày: {new Date(review.date).toLocaleDateString('vi-VN')}</p>
                                </Card>
                            ))}
                        </div>
                     ) : (
                        <p className="text-muted-foreground text-center py-8">Bạn chưa viết đánh giá nào.</p>
                     )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="shadow-lg">
                  <CardHeader className="p-4 md:p-6 border-b"><CardTitle>Cài đặt thông báo</CardTitle></CardHeader>
                  <CardContent className="p-4 md:p-6 space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-md border hover:bg-accent/50 dark:hover:bg-slate-700/30">
                          <Label htmlFor="notif-updates" className="text-sm cursor-pointer flex-grow">Cập nhật đơn hàng</Label>
                          <Switch id="notif-updates" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-md border hover:bg-accent/50 dark:hover:bg-slate-700/30">
                          <Label htmlFor="notif-promo" className="text-sm cursor-pointer flex-grow">Khuyến mãi và ưu đãi</Label>
                          <Switch id="notif-promo" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-md border hover:bg-accent/50 dark:hover:bg-slate-700/30">
                          <Label htmlFor="notif-feed" className="text-sm cursor-pointer flex-grow">Hoạt động Feed mới</Label>
                          <Switch id="notif-feed" />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-md border hover:bg-accent/50 dark:hover:bg-slate-700/30">
                          <Label htmlFor="notif-newsletter" className="text-sm cursor-pointer flex-grow">Bản tin ShopeeCharm</Label>
                          <Switch id="notif-newsletter" defaultChecked />
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="shadow-lg">
                  <CardHeader className="p-4 md:p-6 border-b"><CardTitle>Bảo mật tài khoản</CardTitle></CardHeader>
                  <CardContent className="p-4 md:p-6 space-y-4">
                    <Button variant="outline" className="w-full sm:w-auto">Thay đổi mật khẩu</Button>
                    <Button variant="outline" className="w-full sm:w-auto sm:ml-2">Thiết lập mã PIN ShopeeCharmPay</Button>
                    <Button variant="outline" className="w-full sm:w-auto sm:ml-2">Quản lý thiết bị đăng nhập</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="shadow-lg">
                  <CardHeader className="p-4 md:p-6 border-b"><CardTitle>Cài đặt chung</CardTitle></CardHeader>
                  <CardContent className="p-4 md:p-6 space-y-6">
                     <div>
                      <h3 className="font-semibold mb-2 text-md">Ngôn ngữ & Khu vực</h3>
                      <p className="text-sm text-muted-foreground">Tiếng Việt - Việt Nam (Mặc định)</p>
                      <Button variant="link" size="sm" className="p-0 h-auto text-xs text-primary mt-1">Thay đổi</Button>
                    </div>
                     <div>
                      <h3 className="font-semibold mb-2 text-md">Cài đặt Chat</h3>
                      <div className="flex items-center justify-between">
                          <Label htmlFor="chat-sounds" className="text-sm">Âm thanh thông báo Chat</Label>
                          <Switch id="chat-sounds" defaultChecked />
                        </div>
                    </div>
                    <Button variant="destructive" className="w-full md:w-auto" onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4"/> Đăng xuất khỏi tài khoản
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

            </motion.div>
          </Tabs>
        </div>
      );
    };

    export default UserAccountPage;