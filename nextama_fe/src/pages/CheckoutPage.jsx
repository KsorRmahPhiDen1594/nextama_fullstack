import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
    import { Textarea } from "@/components/ui/textarea"
    import { ArrowLeft, CreditCard, Truck, DollarSign, Gift, CheckCircle } from 'lucide-react';
    import { useShoppingCart } from '@/contexts/ShoppingCartContext';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';

    const CheckoutPage = () => {
      const { cartItems, subtotal, clearCart } = useShoppingCart();
      const { currentUser } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();

      const [shippingAddress, setShippingAddress] = useState({
        fullName: currentUser?.name || '',
        phone: currentUser?.phone || '0987654321',
        address: currentUser?.address || '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
        city: 'TP.HCM',
        notes: ''
      });
      const [paymentMethod, setPaymentMethod] = useState('cod');
      const [isOrderPlaced, setIsOrderPlaced] = useState(false);

      const shippingFee = cartItems.length > 0 ? 30000 : 0;
      const discount = 0; 
      const total = subtotal + shippingFee - discount;

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));
      };

      const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
          toast({ variant: "destructive", title: "Lỗi đặt hàng", description: "Giỏ hàng của bạn đang trống." });
          return;
        }
        // Simulate order placement
        console.log("Order placed:", { shippingAddress, paymentMethod, cartItems, total });
        
        // Store order in localStorage (simplified)
        const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.id}`)) || [];
        const newOrder = {
            id: `SC${Date.now()}`,
            date: new Date().toISOString(),
            items: cartItems,
            totalAmount: total,
            shippingAddress,
            paymentMethod,
            status: "Đang xử lý"
        };
        orders.push(newOrder);
        localStorage.setItem(`orders_${currentUser.id}`, JSON.stringify(orders));

        clearCart();
        setIsOrderPlaced(true);
        toast({ title: "Đặt hàng thành công!", description: "Cảm ơn bạn đã mua sắm tại NextAma." });
      };

      if (isOrderPlaced) {
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="container mx-auto py-10 text-center"
          >
            <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
            <p className="text-muted-foreground mb-6">Cảm ơn bạn đã tin tưởng và mua sắm tại NextAma. Đơn hàng của bạn đang được xử lý.</p>
            <div className="space-x-4">
              <Button asChild className="gradient-shopee text-primary-foreground">
                <Link to="/">Tiếp tục mua sắm</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/account/orders">Xem lịch sử đơn hàng</Link>
              </Button>
            </div>
          </motion.div>
        );
      }


      return (
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-card dark:bg-slate-800 shadow-sm rounded-lg p-4 md:p-6 mb-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <CreditCard className="mr-3 h-7 w-7 text-primary" /> Thanh Toán Đơn Hàng
            </h1>
            <Button variant="outline" asChild>
              <Link to="/cart" className="text-sm flex items-center">
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Quay lại giỏ hàng
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Shipping and Payment Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="shadow-md">
                <CardHeader className="p-4 border-b">
                  <CardTitle className="text-lg flex items-center"><Truck className="mr-2 h-5 w-5 text-primary"/> Địa chỉ giao hàng</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Họ và tên</Label>
                      <Input id="fullName" name="fullName" value={shippingAddress.fullName} onChange={handleInputChange} placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" name="phone" type="tel" value={shippingAddress.phone} onChange={handleInputChange} placeholder="09xxxxxxxx" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Địa chỉ chi tiết</Label>
                    <Input id="address" name="address" value={shippingAddress.address} onChange={handleInputChange} placeholder="Số nhà, tên đường, phường/xã, quận/huyện" />
                  </div>
                  <div>
                    <Label htmlFor="city">Tỉnh/Thành phố</Label>
                    <Input id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} placeholder="TP. Hồ Chí Minh" />
                  </div>
                  <div>
                    <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                    <Textarea id="notes" name="notes" value={shippingAddress.notes} onChange={handleInputChange} placeholder="Ví dụ: Giao hàng giờ hành chính" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="p-4 border-b">
                  <CardTitle className="text-lg flex items-center"><DollarSign className="mr-2 h-5 w-5 text-primary"/> Phương thức thanh toán</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <RadioGroup defaultValue="cod" value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-grow cursor-pointer">Thanh toán khi nhận hàng (COD)</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="zalopay" id="zalopay" />
                      <Label htmlFor="zalopay" className="flex-grow cursor-pointer">Ví ZaloPay</Label>
                       <img  alt="ZaloPay" class="h-6" src="https://images.unsplash.com/photo-1631005551113-6533834aefea" />
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="momo" id="momo" />
                      <Label htmlFor="momo" className="flex-grow cursor-pointer">Ví Momo</Label>
                       <img  alt="Momo" class="h-6" src="https://images.unsplash.com/photo-1556742208-999815fca738" />
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="shopeepay" id="shopeepay" />
                      <Label htmlFor="shopeepay" className="flex-grow cursor-pointer">Ví ShopeeCharmPay</Label>
                       <img  alt="ShopeeCharmPay" class="h-6" src="https://images.unsplash.com/photo-1586880244543-0528a802be97" />
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-md hover:border-primary transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-grow cursor-pointer">Thẻ tín dụng/Ghi nợ</Label>
                      <CreditCard className="h-5 w-5 text-muted-foreground"/>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              <Card className="shadow-lg glassmorphism sticky top-24">
                <CardHeader className="p-4 border-b">
                  <CardTitle className="text-lg flex items-center"><Gift className="mr-2 h-5 w-5 text-primary"/> Đơn hàng của bạn</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3 text-sm max-h-60 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={`${item.id}-${JSON.stringify(item.variant)}`} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                         <img  className="w-10 h-10 object-cover rounded border" alt={item.name} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                        <div>
                          <p className="font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">SL: {item.quantity}</p>
                        </div>
                      </div>
                      <span>{(parseFloat(item.price.replace(/[.₫]/g, '')) * item.quantity).toLocaleString()}₫</span>
                    </div>
                  ))}
                </CardContent>
                <hr className="mx-4 border-border/70 dark:border-border/30"/>
                <CardContent className="p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span>{subtotal.toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span>{shippingFee.toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Giảm giá</span>
                    <span className="text-green-600">-{discount.toLocaleString()}₫</span>
                  </div>
                  <hr className="my-2 border-border/70 dark:border-border/30"/>
                  <div className="flex justify-between font-bold text-md">
                    <span>Tổng cộng</span>
                    <span className="text-primary text-lg">{total.toLocaleString()}₫</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button 
                    size="lg" 
                    className="w-full gradient-shopee text-primary-foreground text-base" 
                    onClick={handlePlaceOrder}
                    disabled={cartItems.length === 0}
                  >
                    Đặt Hàng Ngay
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      );
    };

    export default CheckoutPage;