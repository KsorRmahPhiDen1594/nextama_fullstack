import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';
    import { DollarSign, ShoppingCart, Users, AlertTriangle, BarChart3, TrendingUp, PackageCheck, UserCheck, Activity } from 'lucide-react';
    // For charts, you'd typically use a library like Recharts or Chart.js. This is a placeholder.
    // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

    const StatCard = ({ title, value, icon: Icon, trend, color }) => (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow glassmorphism border-border/50 dark:border-border/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <Icon className={`h-5 w-5 ${color || 'text-primary'}`} />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{value}</div>
            {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
          </CardContent>
        </Card>
      </motion.div>
    );
    
    // Placeholder chart data
    const revenueData = [
      { name: 'T1', DoanhThu: 4000 }, { name: 'T2', DoanhThu: 3000 }, { name: 'T3', DoanhThu: 2000 },
      { name: 'T4', DoanhThu: 2780 }, { name: 'T5', DoanhThu: 1890 }, { name: 'T6', DoanhThu: 2390 },
      { name: 'T7', DoanhThu: 3490 },
    ];

    const AdminDashboardPage = () => {
      return (
        <div className="space-y-6 md:space-y-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold"
          >
            Admin Dashboard
          </motion.h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard title="Doanh thu hôm nay" value="15.250.000₫" icon={DollarSign} trend="+20.1% so với hôm qua" color="text-green-500" />
            <StatCard title="Đơn hàng mới" value="125" icon={ShoppingCart} trend="+15 đơn trong giờ qua" color="text-blue-500" />
            <StatCard title="Người dùng mới" value="52" icon={Users} trend="Trong 24 giờ" color="text-indigo-500" />
            <StatCard title="Cảnh báo tồn kho" value="8" icon={AlertTriangle} trend="Sản phẩm sắp hết hàng" color="text-red-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary"/>Biểu đồ doanh thu (7 ngày qua)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72 md:h-80 bg-muted/50 dark:bg-slate-800/50 rounded flex items-center justify-center p-4">
                    {/* Placeholder for actual chart component */}
                    <BarChart3 className="h-24 w-24 text-muted-foreground/30" />
                    <span className="ml-4 text-muted-foreground">Dữ liệu biểu đồ sẽ được hiển thị ở đây. (Cần thư viện biểu đồ)</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-primary"/>Top ngành hàng bán chạy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["Thời trang Nam", "Điện thoại & Phụ kiện", "Thiết bị gia dụng", "Mẹ & Bé", "Sắc đẹp"].map((cat, index) => (
                    <div key={cat} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{index + 1}. {cat}</span>
                      <Badge variant="secondary" className="font-mono">{Math.floor(Math.random() * 500 + 50)} đơn</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
              <Card className="shadow-lg">
                <CardHeader><CardTitle className="flex items-center text-lg"><PackageCheck className="mr-2 h-5 w-5 text-green-500"/>Trạng thái đơn hàng</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Đang xử lý:</span> <span className="font-semibold">50</span></div>
                    <div className="flex justify-between"><span>Đang giao:</span> <span className="font-semibold">75</span></div>
                    <div className="flex justify-between"><span>Hoàn thành:</span> <span className="font-semibold">1230</span></div>
                    <div className="flex justify-between"><span>Đã hủy:</span> <span className="font-semibold">15</span></div>
                </CardContent>
              </Card>
            </motion.div>
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <Card className="shadow-lg">
                <CardHeader><CardTitle className="flex items-center text-lg"><UserCheck className="mr-2 h-5 w-5 text-blue-500"/>Hoạt động người dùng</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Đang hoạt động:</span> <span className="font-semibold">1,205</span></div>
                    <div className="flex justify-between"><span>Đăng ký mới (24h):</span> <span className="font-semibold">88</span></div>
                    <div className="flex justify-between"><span>Tổng số người dùng:</span> <span className="font-semibold">15,670</span></div>
                </CardContent>
              </Card>
            </motion.div>
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
              <Card className="shadow-lg">
                <CardHeader><CardTitle className="flex items-center text-lg"><Activity className="mr-2 h-5 w-5 text-purple-500"/>Hoạt động hệ thống</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Trạng thái máy chủ:</span> <Badge className="bg-green-500 text-white">Online</Badge></div>
                    <div className="flex justify-between"><span>Lỗi gần đây:</span> <span className="font-semibold">0</span></div>
                    <div className="flex justify-between"><span>Lần bảo trì cuối:</span> <span className="font-semibold">20/05/2025</span></div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>
      );
    };

    export default AdminDashboardPage;