import React, { Suspense } from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import { AuthProvider } from '@/contexts/AuthContext.jsx';
    import MainLayout from '@/layouts/MainLayout.jsx';
    import AdminLayout from '@/layouts/AdminLayout.jsx';
    import ProtectedRoute from '@/components/ProtectedRoute.jsx';
    import { ShoppingCartProvider } from '@/contexts/ShoppingCartContext.jsx';
    import { WishlistProvider } from '@/contexts/WishlistContext.jsx';
    import { ThemeProvider } from '@/contexts/ThemeContext.jsx';
    import ChatWidget from '@/components/ChatWidget.jsx';

    const HomePage = React.lazy(() => import('@/pages/HomePage.jsx'));
    const CategoryPage = React.lazy(() => import('@/pages/CategoryPage.jsx'));
    const ProductDetailPage = React.lazy(() => import('@/pages/ProductDetailPage.jsx'));
    const CartPage = React.lazy(() => import('@/pages/CartPage.jsx'));
    const CheckoutPage = React.lazy(() => import('@/pages/CheckoutPage.jsx'));
    const UserAccountPage = React.lazy(() => import('@/pages/UserAccountPage.jsx'));
    const LoginPage = React.lazy(() => import('@/pages/LoginPage.jsx'));
    const RegisterPage = React.lazy(() => import('@/pages/RegisterPage.jsx'));
    const AdminLoginPage = React.lazy(() => import('@/pages/admin/AdminLoginPage.jsx'));
    const AdminDashboardPage = React.lazy(() => import('@/pages/admin/AdminDashboardPage.jsx'));
    const AdminUserManagementPage = React.lazy(() => import('@/pages/admin/AdminUserManagementPage.jsx'));
    const AdminProductManagementPage = React.lazy(() => import('@/pages/admin/AdminProductManagementPage.jsx'));
    const AdminOrderManagementPage = React.lazy(() => import('@/pages/admin/AdminOrderManagementPage.jsx'));
    const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage.jsx'));
    const HelpPage = React.lazy(() => import('@/pages/HelpPage.jsx'));
    const AboutPage = React.lazy(() => import('@/pages/AboutPage.jsx'));
    const TermsPage = React.lazy(() => import('@/pages/TermsPage.jsx'));
    const NotificationsPage = React.lazy(() => import('@/pages/NotificationsPage.jsx'));


    function App() {
      return (
        <Router>
          <ThemeProvider>
            <AuthProvider>
              <ShoppingCartProvider>
                <WishlistProvider>
                  <Suspense fallback={<div className="flex justify-center items-center h-screen text-primary text-xl">Đang tải trang...</div>}>
                    <Routes>
                      <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="category/:categoryName?" element={<CategoryPage />} />
                        <Route path="product/:id" element={<ProductDetailPage />} />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                        <Route path="account/:tab?" element={<ProtectedRoute><UserAccountPage /></ProtectedRoute>} />
                        <Route path="notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                        <Route path="help" element={<HelpPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="terms" element={<TermsPage />} />
                      </Route>
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/admin/login" element={<AdminLoginPage />} />
                      <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
                        <Route path="dashboard" element={<AdminDashboardPage />} />
                        <Route path="users" element={<AdminUserManagementPage />} />
                        <Route path="products" element={<AdminProductManagementPage />} />
                        <Route path="orders" element={<AdminOrderManagementPage />} />
                      </Route>
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                  <ChatWidget />
                  <Toaster />
                </WishlistProvider>
              </ShoppingCartProvider>
            </AuthProvider>
          </ThemeProvider>
        </Router>
      );
    }

    export default App;