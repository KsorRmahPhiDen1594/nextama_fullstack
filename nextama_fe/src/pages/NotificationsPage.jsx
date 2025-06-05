import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Bell, ShoppingCart, Tag, Gift, Settings, Trash2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent } from '@/components/ui/card';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { Badge } from '@/components/ui/badge';

    const initialNotifications = {
      orders: [
        { id: 'o1', title: 'Đơn hàng #SC12345 đã được giao thành công!', description: 'Cảm ơn bạn đã mua sắm. Hãy đánh giá sản phẩm nhé!', date: '2025-05-27 10:30', read: false, icon: ShoppingCart, type: 'Đơn hàng' },
        { id: 'o2', title: 'Đơn hàng #SC12340 đang được vận chuyển.', description: 'Dự kiến giao hàng vào ngày mai. Theo dõi hành trình tại đây.', date: '2025-05-26 15:00', read: true, icon: ShoppingCart, type: 'Đơn hàng' },
      ],
      promotions: [
        { id: 'p1', title: '🔥 Flash Sale giữa tháng sắp bắt đầu!', description: 'Hàng ngàn deal sốc giảm đến 70%. Đừng bỏ lỡ vào 12h trưa nay!', date: '2025-05-28 08:00', read: false, icon: Tag, type: 'Khuyến mãi' },
        { id: 'p2', title: 'Voucher FREESHIP MAX đã về ví!', description: 'Sử dụng ngay cho đơn hàng từ 99K. Số lượng có hạn.', date: '2025-05-25 12:00', read: false, icon: Tag, type: 'Khuyến mãi' },
      ],
      system: [
        { id: 's1', title: 'Chào mừng bạn đến với NextAma!', description: 'Khám phá ngay hàng ngàn sản phẩm và ưu đãi hấp dẫn.', date: '2025-05-20 09:00', read: true, icon: Gift, type: 'Hệ thống' },
        { id: 's2', title: 'Cập nhật chính sách bảo mật mới.', description: 'Vui lòng xem chi tiết để đảm bảo quyền lợi của bạn.', date: '2025-05-15 14:00', read: true, icon: Settings, type: 'Hệ thống' },
      ],
    };

    const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
      const Icon = notification.icon;
      return (
        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className={`p-4 border-b dark:border-slate-700 last:border-b-0 flex items-start space-x-3 hover:bg-accent/50 dark:hover:bg-slate-700/30 transition-colors ${!notification.read ? 'bg-primary/5 dark:bg-primary/10' : 'bg-card dark:bg-slate-800'}`}
        >
          <div className={`p-2 rounded-full mt-1 ${!notification.read ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h3 className={`font-semibold text-sm md:text-md ${!notification.read ? 'text-primary' : ''}`}>{notification.title}</h3>
              {!notification.read && <Badge variant="destructive" className="text-xs px-1.5 py-0.5 ml-2">Mới</Badge>}
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5 mb-1">{notification.description}</p>
            <span className="text-xs text-muted-foreground/70">{notification.date}</span>
          </div>
          <div className="flex flex-col space-y-1">
            {!notification.read && 
              <Button variant="ghost" size="xs" className="text-xs p-1 h-auto text-blue-600 hover:bg-blue-100" onClick={() => onMarkRead(notification.id, notification.type)}>
                Đánh dấu đã đọc
              </Button>
            }
            <Button variant="ghost" size="xs" className="text-xs p-1 h-auto text-red-500 hover:bg-red-100" onClick={() => onDelete(notification.id, notification.type)}>
              <Trash2 className="h-3 w-3 mr-1"/> Xóa
            </Button>
          </div>
        </motion.div>
      );
    };

    const NotificationsPage = () => {
      const [notifications, setNotifications] = useState(initialNotifications);
      const [currentTab, setCurrentTab] = useState('all');

      const markAsRead = (id, type) => {
        const typeKey = type.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
        setNotifications(prev => ({
          ...prev,
          [typeKey]: prev[typeKey].map(n => n.id === id ? { ...n, read: true } : n)
        }));
      };
      
      const deleteNotification = (id, type) => {
        const typeKey = type.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
        setNotifications(prev => ({
          ...prev,
          [typeKey]: prev[typeKey].filter(n => n.id !== id)
        }));
      };

      const markAllAsRead = (tabKey) => {
        if (tabKey === 'all') {
            setNotifications(prev => ({
                orders: prev.orders.map(n => ({...n, read: true})),
                promotions: prev.promotions.map(n => ({...n, read: true})),
                system: prev.system.map(n => ({...n, read: true})),
            }));
        } else {
            setNotifications(prev => ({
                ...prev,
                [tabKey]: prev[tabKey].map(n => ({...n, read: true}))
            }));
        }
      };

      const getNotificationsForTab = (tab) => {
        switch (tab) {
          case 'orders': return notifications.orders;
          case 'promotions': return notifications.promotions;
          case 'system': return notifications.system;
          default: return [...notifications.orders, ...notifications.promotions, ...notifications.system].sort((a,b) => new Date(b.date) - new Date(a.date));
        }
      };
      
      const displayedNotifications = getNotificationsForTab(currentTab);
      const unreadCount = (type) => {
        if (type === 'all') {
            return notifications.orders.filter(n => !n.read).length + 
                   notifications.promotions.filter(n => !n.read).length +
                   notifications.system.filter(n => !n.read).length;
        }
        return notifications[type] ? notifications[type].filter(n => !n.read).length : 0;
      }


      return (
        <div className="container mx-auto py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-card dark:bg-slate-800 shadow-sm rounded-lg p-4 md:p-6 mb-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <Bell className="mr-3 h-7 w-7 text-primary" /> Thông Báo
            </h1>
            {displayedNotifications.some(n => !n.read) && (
                <Button variant="outline" size="sm" onClick={() => markAllAsRead(currentTab)}>
                    Đánh dấu tất cả đã đọc
                </Button>
            )}
          </motion.div>

          <Card className="shadow-lg">
            <Tabs defaultValue="all" onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 rounded-none rounded-t-lg border-b h-auto">
                <TabsTrigger value="all" className="py-3 text-sm md:text-md data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">
                    Tất cả {unreadCount('all') > 0 && <Badge className="ml-1.5 bg-red-500 text-white">{unreadCount('all')}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="orders" className="py-3 text-sm md:text-md data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">
                    Đơn hàng {unreadCount('orders') > 0 && <Badge className="ml-1.5 bg-red-500 text-white">{unreadCount('orders')}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="promotions" className="py-3 text-sm md:text-md data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">
                    Khuyến mãi {unreadCount('promotions') > 0 && <Badge className="ml-1.5 bg-red-500 text-white">{unreadCount('promotions')}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="system" className="py-3 text-sm md:text-md data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">
                    Hệ thống {unreadCount('system') > 0 && <Badge className="ml-1.5 bg-red-500 text-white">{unreadCount('system')}</Badge>}
                </TabsTrigger>
              </TabsList>
              
              <CardContent className="p-0 max-h-[calc(100vh-20rem)] overflow-y-auto">
                {displayedNotifications.length > 0 ? (
                  <AnimatePresence>
                    {displayedNotifications.map(notification => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification} 
                        onMarkRead={markAsRead}
                        onDelete={deleteNotification}
                      />
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="text-center py-16 text-muted-foreground">
                    <Bell className="mx-auto h-16 w-16 opacity-50 mb-4" />
                    <p>Không có thông báo nào.</p>
                  </div>
                )}
              </CardContent>
            </Tabs>
          </Card>
        </div>
      );
    };

    export default NotificationsPage;