import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
    import { Badge } from '@/components/ui/badge';
    import { ShoppingCart, MoreHorizontal, Search, Eye, Edit, Truck, CheckCircle, XCircle, RefreshCcw, PenLine as FilePenLine } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
    import { Label } from "@/components/ui/label";


    const mockAdminOrders = Array(10).fill(null).map((_, i) => {
        const statuses = ["Đang xử lý", "Đang giao", "Đã giao", "Đã hủy", "Hoàn tiền"];
        const paymentMethods = ["COD", "ZaloPay", "Momo", "Thẻ tín dụng"];
        const itemsCount = Math.floor(Math.random() * 3) + 1;
        let totalAmount = 0;
        const items = Array(itemsCount).fill(null).map((_item, idx) => {
            const itemPrice = (Math.random() * 500000 + 50000);
            totalAmount += itemPrice;
            return { name: `Sản phẩm ${idx + 1}`, quantity: Math.floor(Math.random() * 2) + 1, price: itemPrice.toFixed(0) };
        });

        return {
            id: `SC-ORDER-${12345 + i}`,
            customerName: `Khách Hàng ${String.fromCharCode(65 + i)}`,
            date: new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            totalAmount: totalAmount.toFixed(0),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
            items: items,
            shippingAddress: `${100 + i} Đường Chính, Phường ${i+1}, Quận ${String.fromCharCode(65 + (i % 4))}, TP. Hồ Chí Minh`
        }
    });


    const AdminOrderManagementPage = () => {
      const [orders, setOrders] = useState(mockAdminOrders);
      const [searchTerm, setSearchTerm] = useState('');
      const [filterStatus, setFilterStatus] = useState('all');
      const [selectedOrder, setSelectedOrder] = useState(null);
      const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
      const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
      const [newStatus, setNewStatus] = useState('');
      const { toast } = useToast();

      const openDetailModal = (order) => {
        setSelectedOrder(order);
        setIsDetailModalOpen(true);
      };
      
      const openEditStatusModal = (order) => {
        setSelectedOrder(order);
        setNewStatus(order.status);
        setIsEditStatusModalOpen(true);
      };

      const handleUpdateStatus = () => {
        if (!selectedOrder || !newStatus) {
            toast({ variant: "destructive", title: "Lỗi", description: "Vui lòng chọn trạng thái mới." });
            return;
        }
        const updatedOrders = orders.map(o => o.id === selectedOrder.id ? { ...o, status: newStatus } : o);
        setOrders(updatedOrders);
        toast({ title: "Thành công", description: `Đã cập nhật trạng thái đơn hàng ${selectedOrder.id} thành ${newStatus}.` });
        setIsEditStatusModalOpen(false);
        setSelectedOrder(null);
      };
      
      const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
      });
      
      const orderStatuses = ["Đang xử lý", "Đang giao", "Đã giao", "Đã hủy", "Hoàn tiền"];


      return (
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-between items-center"
          >
            <h1 className="text-3xl font-bold flex items-center"><ShoppingCart className="mr-3 h-8 w-8 text-primary"/>Quản lý Đơn hàng</h1>
          </motion.div>

          <Card className="shadow-lg">
            <CardHeader className="p-4 border-b">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Tìm theo ID đơn, tên khách hàng..." 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Trạng thái đơn hàng" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả trạng thái</SelectItem>
                        {orderStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Đơn hàng</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Ngày đặt</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead>Thanh toán</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right w-[100px]">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map(order => (
                    <TableRow key={order.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-primary hover:underline cursor-pointer" onClick={() => openDetailModal(order)}>{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{parseInt(order.totalAmount).toLocaleString()}₫</TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                      <TableCell>
                        <Badge variant={
                            order.status === 'Đã giao' ? 'default' :
                            order.status === 'Đang giao' ? 'outline' :
                            order.status === 'Đang xử lý' ? 'secondary' :
                            order.status === 'Đã hủy' || order.status === 'Hoàn tiền' ? 'destructive' : 'secondary'
                        } className={
                            order.status === 'Đã giao' ? 'bg-green-500 text-white' : 
                            order.status === 'Đang giao' ? 'border-blue-500 text-blue-600' : ''
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openDetailModal(order)}><Eye className="mr-2 h-4 w-4"/>Xem chi tiết</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditStatusModal(order)}><FilePenLine className="mr-2 h-4 w-4"/>Cập nhật trạng thái</DropdownMenuItem>
                            {order.status === "Đang xử lý" && <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50"><XCircle className="mr-2 h-4 w-4"/>Hủy đơn hàng</DropdownMenuItem>}
                            {order.status === "Đã giao" && <DropdownMenuItem><RefreshCcw className="mr-2 h-4 w-4"/>Xử lý hoàn tiền</DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredOrders.length === 0 && <p className="p-4 text-center text-muted-foreground">Không tìm thấy đơn hàng nào.</p>}
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="text-xs text-muted-foreground">
                Hiển thị <strong>{filteredOrders.length}</strong> trên tổng số <strong>{orders.length}</strong> đơn hàng.
              </div>
            </CardFooter>
          </Card>

          {selectedOrder && (
            <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                <DialogContent className="sm:max-w-lg md:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Chi tiết đơn hàng: {selectedOrder.id}</DialogTitle>
                        <DialogDescription>Thông tin chi tiết về đơn hàng và sản phẩm.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 max-h-[60vh] overflow-y-auto pr-2 space-y-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <p><strong className="text-muted-foreground">Khách hàng:</strong> {selectedOrder.customerName}</p>
                            <p><strong className="text-muted-foreground">Ngày đặt:</strong> {selectedOrder.date}</p>
                            <p><strong className="text-muted-foreground">Tổng tiền:</strong> <span className="font-bold text-primary">{parseInt(selectedOrder.totalAmount).toLocaleString()}₫</span></p>
                            <p><strong className="text-muted-foreground">Thanh toán:</strong> {selectedOrder.paymentMethod}</p>
                            <p className="col-span-2"><strong className="text-muted-foreground">Địa chỉ giao:</strong> {selectedOrder.shippingAddress}</p>
                            <p className="col-span-2"><strong className="text-muted-foreground">Trạng thái:</strong> <Badge>{selectedOrder.status}</Badge></p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-md">Sản phẩm trong đơn:</h4>
                            <ul className="space-y-2">
                                {selectedOrder.items.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center p-2 bg-muted/50 dark:bg-slate-800/50 rounded-md text-sm">
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">SL: {item.quantity}</p>
                                        </div>
                                        <span>{parseInt(item.price).toLocaleString()}₫</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>Đóng</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          )}

          {selectedOrder && (
            <Dialog open={isEditStatusModalOpen} onOpenChange={setIsEditStatusModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
                        <DialogDescription>Đơn hàng: {selectedOrder.id}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="order-status" className="mb-2 block">Trạng thái mới</Label>
                        <Select value={newStatus} onValueChange={setNewStatus}>
                            <SelectTrigger id="order-status">
                                <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                {orderStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditStatusModalOpen(false)}>Hủy</Button>
                        <Button onClick={handleUpdateStatus} className="gradient-shopee text-primary-foreground">Lưu thay đổi</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          )}

        </div>
      );
    };

    export default AdminOrderManagementPage;