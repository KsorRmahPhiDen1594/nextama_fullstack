import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { Checkbox } from '@/components/ui/checkbox';
    import { useAuth } from '@/contexts/AuthContext';
    import { UserPlus, ShoppingCart, Mail, KeyRound, User as UserIcon, Eye, EyeOff } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';

    const RegisterPage = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const [agreedToTerms, setAgreedToTerms] = useState(false);
      const { register, loading } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
          toast({ variant: "destructive", title: "Lỗi", description: "Vui lòng điền đầy đủ thông tin." });
          return;
        }
        if (password !== confirmPassword) {
          toast({ variant: "destructive", title: "Lỗi", description: "Mật khẩu xác nhận không khớp." });
          return;
        }
        if (!agreedToTerms) {
          toast({ variant: "destructive", title: "Lỗi", description: "Bạn phải đồng ý với Điều khoản dịch vụ." });
          return;
        }
        try {
          await register(name, email, password);
          navigate("/"); 
        } catch (error) {
          // Toast is handled in AuthContext
        }
      };

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full max-w-lg"
          >
            <Card className="shadow-2xl glassmorphism border-primary/20">
              <CardHeader className="text-center p-6">
                <Link to="/" className="flex items-center justify-center mb-4 text-3xl font-bold gradient-shopee bg-clip-text text-transparent">
                  <ShoppingCart className="h-8 w-8 mr-2 text-primary" />
                  ShopeeCharm
                </Link>
                <CardTitle className="text-2xl font-semibold">Tạo Tài Khoản Mới</CardTitle>
                <CardDescription>Tham gia ShopeeCharm ngay hôm nay!</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Tên hiển thị</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="name" placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                     <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="nhapemail@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="Ít nhất 6 ký tự" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required />
                      <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                     <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 pr-10" required />
                      <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-1">
                    <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
                    <Label htmlFor="terms" className="text-xs text-muted-foreground font-normal">
                      Tôi đồng ý với <Link to="/terms" className="text-primary hover:underline">Điều khoản dịch vụ</Link> và <Link to="/privacy-policy" className="text-primary hover:underline">Chính sách bảo mật</Link>.
                    </Label>
                  </div>
                  <Button type="submit" className="w-full gradient-shopee text-primary-foreground text-md py-3" disabled={loading || !agreedToTerms}>
                    {loading ? 'Đang xử lý...' : <><UserPlus className="mr-2 h-5 w-5" /> Đăng Ký</>}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-center text-sm text-muted-foreground p-6 border-t">
                Đã có tài khoản? <Link to="/login" className="font-semibold text-primary hover:underline ml-1">Đăng nhập ngay</Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default RegisterPage;