import React, { useState } from 'react';
    import { Link, useNavigate, useLocation } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useAuth } from '@/contexts/AuthContext';
    import { LogIn, ShoppingCart, Mail, KeyRound, Facebook, Twitter, Eye, EyeOff } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';

    const LoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const { login, loading } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();
      const { toast } = useToast();
      const from = location.state?.from?.pathname || "/";

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
          toast({ variant: "destructive", title: "Lỗi", description: "Vui lòng nhập đầy đủ email và mật khẩu." });
          return;
        }
        try {
          await login(email, password);
          navigate(from, { replace: true });
        } catch (error) {
          // Toast is handled in AuthContext
        }
      };

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full max-w-md"
          >
            <Card className="shadow-2xl glassmorphism border-primary/20">
              <CardHeader className="text-center p-6">
                <Link to="/" className="flex items-center justify-center mb-4 text-3xl font-bold gradient-shopee bg-clip-text text-transparent">
                  <ShoppingCart className="h-8 w-8 mr-2 text-primary" />
                  ShopeeCharm
                </Link>
                <CardTitle className="text-2xl font-semibold">Đăng Nhập Tài Khoản</CardTitle>
                <CardDescription>Chào mừng bạn trở lại! Vui lòng đăng nhập.</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="nhapemail@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="pl-10 pr-10"
                        required
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline float-right">Quên mật khẩu?</Link>
                  </div>
                  <Button type="submit" className="w-full gradient-shopee text-primary-foreground text-md py-3" disabled={loading}>
                    {loading ? 'Đang xử lý...' : <><LogIn className="mr-2 h-5 w-5" /> Đăng Nhập</>}
                  </Button>
                </form>
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Hoặc đăng nhập với</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full"><Facebook className="mr-2 h-4 w-4 text-blue-600"/> Facebook</Button>
                  <Button variant="outline" className="w-full"><Twitter className="mr-2 h-4 w-4 text-sky-500"/> Twitter</Button>
                </div>
              </CardContent>
              <CardFooter className="text-center text-sm text-muted-foreground p-6 border-t">
                Chưa có tài khoản? <Link to="/register" className="font-semibold text-primary hover:underline ml-1">Đăng ký ngay</Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default LoginPage;