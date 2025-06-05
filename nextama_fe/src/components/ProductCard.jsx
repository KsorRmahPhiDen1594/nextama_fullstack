import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [loading, setLoading] = React.useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  if (!product) {
    return <div>Không có dữ liệu sản phẩm</div>;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden group border-border/60 hover:border-primary/50 dark:border-border/30 dark:hover:border-primary/50">
        <Link to={`/product/${product.id}`} className="block">
          <CardContent className="p-0 flex flex-col flex-grow">
            <div className="relative">
              <img
                className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                alt={product.alt || product.name || 'Sản phẩm'}
                src={product.image || 'https://images.unsplash.com/photo-1674027392838-d85710a5121d'}
              />
              {product.discountPercentage > 0 && (
                <Badge variant="destructive" className="absolute top-2 right-2 text-xs bg-blue-500">
                  -{product.discountPercentage}%
                </Badge>
              )}
              {product.tags && (
                <div className="absolute top-2 left-2 flex space-x-1">
                  {product.tags.map((tag, idx) => (
                    <Badge key={idx} className={`text-xs ${tag === 'NEW' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="p-3 md:p-4 space-y-1.5 flex flex-col flex-grow">
              <h3 className="font-semibold text-sm md:text-md line-clamp-2 group-hover:text-primary transition-colors h-10 md:h-12">
                {product.name || 'Tên sản phẩm'}
              </h3>
              {product.description && (
                <p className="text-gray-600 text-xs md:text-sm">{product.description}</p>
              )}
              <div className="flex items-baseline space-x-2">
                <p className="text-primary font-bold text-md md:text-lg">{product.price || 'N/A'}</p>
                {product.originalPrice && (
                  <p className="text-xs md:text-sm text-muted-foreground line-through">{product.originalPrice}</p>
                )}
              </div>
              {product.sold !== undefined && product.total !== undefined && (
                <div className="flex items-center space-x-2">
                  <img src="/assets/fire-2.gif" alt="fire" className="h-5 w-5" />
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-600 h-2.5 rounded-full"
                      style={{ width: `${(product.sold / product.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{`${product.sold}/${product.total}`}</span>
                </div>
              )}
              <div className="mt-auto pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white border-none"
                  onClick={handleAddToCart}
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Thêm vào Giỏ Hàng'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ProductCard;