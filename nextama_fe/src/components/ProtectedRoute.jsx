import React from 'react';
    import { Navigate, useLocation } from 'react-router-dom';
    import { useAuth } from '@/contexts/AuthContext';

    const ProtectedRoute = ({ children, adminOnly = false }) => {
      const { currentUser, loading } = useAuth();
      const location = useLocation();

      if (loading) {
        return <div className="flex justify-center items-center h-screen text-primary text-xl">Đang tải...</div>;
      }

      if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }

      if (adminOnly && (!currentUser.role || !['admin', 'superadmin'].includes(currentUser.role))) {
        return <Navigate to="/" replace />; 
      }
      
      return children;
    };

    export default ProtectedRoute;