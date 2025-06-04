import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useShoppingCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product?.id);
  const [loading, setLoading] = React.useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    addToCart(product);
    setLoading(false);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    toggleWishlist(product);
    setLoading(false);
  };
  
  const actualPrice = product?.price ? parseFloat(String(product.price).replace(/[.₫]/g, '')) : 0;
  const discountPrice = product?.originalPrice ? parseFloat(String(product.originalPrice).replace(/[.₫]/g, '')) : actualPrice;
  const discountPercentage = product?.originalPrice ? Math.round(((discountPrice - actualPrice) / discountPrice) * 100) : 0;

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
              {discountPercentage > 0 && (
                <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
                  -{discountPercentage}%
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className={`absolute top-2 left-2 h-8 w-8 rounded-full bg-white/70 dark:bg-black/50 hover:bg-white dark:hover:bg-black ${isWishlisted ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'}`}
                onClick={handleToggleWishlist}
                disabled={loading}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <div className="p-3 md:p-4 space-y-1.5 flex flex-col flex-grow">
              <h3 className="font-semibold text-sm md:text-md line-clamp-2 group-hover:text-primary transition-colors h-10 md:h-12">
                {product.name || 'Tên sản phẩm'}
              </h3>
              <div className="flex items-baseline space-x-2">
                <p className="text-primary font-bold text-md md:text-lg">{product.price || 'N/A'}</p>
                {product.originalPrice && (
                  <p className="text-xs md:text-sm text-muted-foreground line-through">{product.originalPrice}</p>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-current mr-1" />
                  <span>{product.rating}</span>
                  <span className="mx-1">|</span>
                  <span>Đã bán {product.soldCount || 0}</span>
                </div>
              )}
              <div className="text-xs text-muted-foreground">{product.location || "Toàn quốc"}</div>
              <div className="mt-auto pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-primary/70 text-primary hover:bg-primary/10 hover:text-primary dark:border-primary/50 dark:hover:bg-primary/20"
                  onClick={handleAddToCart}
                  disabled={loading}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> {loading ? 'Đang xử lý...' : 'Thêm vào giỏ'}
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