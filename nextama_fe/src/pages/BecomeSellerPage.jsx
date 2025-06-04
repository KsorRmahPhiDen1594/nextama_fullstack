import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { useNavigate } from 'react-router-dom';
    import { Store, FileText, Phone, MapPin, Image as ImageIcon, CheckCircle } from 'lucide-react';

    const BecomeSellerPage = () => {
      const { toast } = useToast();
      const { currentUser, setCurrentUser } = useAuth();
      const navigate = useNavigate();
      const [formData, setFormData] = useState({
        shopName: '',
        shopDescription: '',
        phoneNumber: '',
        address: '',
        idCardFront: null,
        idCardBack: null,
        businessLicense: null,
      });
      const [formStep, setFormStep] = useState(1);
      const [isSubmitted, setIsSubmitted] = useState(false);

      const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
          setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
          setFormData(prev => ({ ...prev, [name]: value }));
        }
      };

      const handleNextStep = () => {
        if (formStep === 1) {
            if (!formData.shopName || !formData.shopDescription) {
                toast({ variant: "destructive", title: "Thiếu thông tin", description: "Vui lòng nhập tên và mô tả cửa hàng." });
                return;
            }
        }
        if (formStep === 2) {
             if (!formData.phoneNumber || !formData.address) {
                toast({ variant: "destructive", title: "Thiếu thông tin", description: "Vui lòng nhập số điện thoại và địa chỉ." });
                return;
            }
        }
        setFormStep(prev => prev + 1);
      };
      
      const handlePrevStep = () => {
        setFormStep(prev => prev - 1);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.idCardFront || !formData.idCardBack) {
            toast({ variant: "destructive", title: "Thiếu thông tin", description: "Vui lòng tải lên ảnh mặt trước và mặt sau CMND/CCCD." });
            return;
        }

        console.log("Seller application data:", formData);
        
        // Simulate API call
        setTimeout(() => {
          // Update user role to 'seller_pending' or similar
          // For demo, we'll just show a success message
          // In a real app, you'd update this in your backend (e.g., Supabase)
          // And potentially update the currentUser context if role changes immediately
          // For now, we'll assume admin approval is needed.
          
          // Example of updating user role if it's immediate (not typical for seller applications)
          // if (currentUser) {
          //   const updatedUser = { ...currentUser, roles: [...(currentUser.roles || []), 'seller_pending'] };
          //   setCurrentUser(updatedUser);
          //   localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          // }

          setIsSubmitted(true);
          toast({
            title: "Đăng ký thành công!",
            description: "Yêu cầu trở thành người bán của bạn đã được gửi. Chúng tôi sẽ xem xét và phản hồi sớm.",
            className: "bg-green-500 text-white"
          });
        }, 1500);
      };

      if (isSubmitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container mx-auto py-8 md:py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"
            >
                <Card className="w-full max-w-md text-center shadow-xl">
                    <CardHeader>
                        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                        <CardTitle className="text-2xl">Yêu cầu đã được gửi!</CardTitle>
                        <CardDescription>Cảm ơn bạn đã đăng ký trở thành người bán trên ShopeeCharm. Chúng tôi sẽ xem xét hồ sơ của bạn và thông báo kết quả trong thời gian sớm nhất.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={() => navigate('/')} className="w-full gradient-shopee text-primary-foreground">Về trang chủ</Button>
                    </CardFooter>
                </Card>
            </motion.div>
        );
      }


      return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto py-8 md:py-12"
        >
          <Card className="w-full max-w-2xl mx-auto shadow-xl">
            <CardHeader className="text-center">
              <Store className="mx-auto h-12 w-12 text-primary mb-2" />
              <CardTitle className="text-3xl font-bold">Trở thành Người bán trên ShopeeCharm</CardTitle>
              <CardDescription>Hoàn tất các bước sau để bắt đầu hành trình kinh doanh của bạn.</CardDescription>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(formStep / 3) * 100}%` }}></div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Bước {formStep} trên 3</p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 p-6 md:p-8">
                {formStep === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-xl font-semibold text-center mb-4">Thông tin Cửa hàng</h3>
                    <div>
                      <Label htmlFor="shopName" className="text-md">Tên cửa hàng</Label>
                      <Input id="shopName" name="shopName" value={formData.shopName} onChange={handleChange} placeholder="Ví dụ: ShopeeCharm Official Store" required className="mt-1"/>
                    </div>
                    <div>
                      <Label htmlFor="shopDescription" className="text-md">Mô tả cửa hàng</Label>
                      <Textarea id="shopDescription" name="shopDescription" value={formData.shopDescription} onChange={handleChange} placeholder="Giới thiệu về cửa hàng và các sản phẩm chính của bạn..." required className="mt-1"/>
                    </div>
                  </motion.div>
                )}

                {formStep === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-xl font-semibold text-center mb-4">Thông tin Liên hệ & Địa chỉ</h3>
                    <div>
                      <Label htmlFor="phoneNumber" className="text-md">Số điện thoại</Label>
                      <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="Số điện thoại liên hệ của shop" required className="mt-1"/>
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-md">Địa chỉ lấy hàng</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ chi tiết của cửa hàng/kho hàng" required className="mt-1"/>
                    </div>
                  </motion.div>
                )}

                {formStep === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-xl font-semibold text-center mb-4">Xác minh Danh tính & Giấy phép</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="idCardFront" className="text-md flex items-center"><FileText className="h-4 w-4 mr-1.5"/>CMND/CCCD Mặt trước</Label>
                            <Input id="idCardFront" name="idCardFront" type="file" onChange={handleChange} required className="mt-1 file:mr-2 file:py-1.5 file:px-2 file:rounded-md file:border file:border-stone-200 file:text-sm file:font-medium file:bg-stone-50 hover:file:bg-stone-100"/>
                            {formData.idCardFront && <p className="text-xs text-muted-foreground mt-1">{formData.idCardFront.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="idCardBack" className="text-md flex items-center"><FileText className="h-4 w-4 mr-1.5"/>CMND/CCCD Mặt sau</Label>
                            <Input id="idCardBack" name="idCardBack" type="file" onChange={handleChange} required className="mt-1 file:mr-2 file:py-1.5 file:px-2 file:rounded-md file:border file:border-stone-200 file:text-sm file:font-medium file:bg-stone-50 hover:file:bg-stone-100"/>
                            {formData.idCardBack && <p className="text-xs text-muted-foreground mt-1">{formData.idCardBack.name}</p>}
                        </div>
                    </div>
                    <div>
                      <Label htmlFor="businessLicense" className="text-md flex items-center"><ImageIcon className="h-4 w-4 mr-1.5"/>Giấy phép kinh doanh (nếu có)</Label>
                      <Input id="businessLicense" name="businessLicense" type="file" onChange={handleChange} className="mt-1 file:mr-2 file:py-1.5 file:px-2 file:rounded-md file:border file:border-stone-200 file:text-sm file:font-medium file:bg-stone-50 hover:file:bg-stone-100"/>
                      {formData.businessLicense && <p className="text-xs text-muted-foreground mt-1">{formData.businessLicense.name}</p>}
                    </div>
                    <p className="text-xs text-muted-foreground text-center pt-2">Bằng việc gửi đơn, bạn đồng ý với <a href="/terms" className="text-primary hover:underline">Điều khoản Dịch vụ</a> của ShopeeCharm.</p>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between p-6 md:p-8">
                {formStep > 1 && (
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    Quay lại
                  </Button>
                )}
                {formStep < 3 && (
                  <Button type="button" onClick={handleNextStep} className="ml-auto gradient-shopee text-primary-foreground">
                    Tiếp theo
                  </Button>
                )}
                {formStep === 3 && (
                  <Button type="submit" className="ml-auto gradient-shopee-dark text-primary-foreground">
                    Gửi Đơn Đăng Ký
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      );
    };

    export default BecomeSellerPage;