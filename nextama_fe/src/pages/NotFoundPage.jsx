import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { AlertTriangle } from 'lucide-react';
    import { motion } from 'framer-motion';

    const NotFoundPage = () => {
      return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center p-4">
          <motion.div
            initial={{ opacity: 0, y: -50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          >
            <AlertTriangle className="h-24 w-24 md:h-32 md:w-32 text-primary mb-6" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            404 - Không Tìm Thấy Trang
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md"
          >
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button asChild size="lg" className="gradient-shopee text-primary-foreground text-md px-8 py-3">
              <Link to="/">Về Trang Chủ</Link>
            </Button>
          </motion.div>
        </div>
      );
    };

    export default NotFoundPage;