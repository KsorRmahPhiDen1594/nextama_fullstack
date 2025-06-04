import React from 'react';
    import { Link } from 'react-router-dom';
    import { Card } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';
    import { Button } from '@/components/ui/button';
    import { Star, Heart, ShoppingCart } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { useShoppingCart } from '@/contexts/ShoppingCartContext';
    import { useWishlist } from '@/contexts/WishlistContext';

    const ProductListItem = ({ product }) => {
      const { addToCart } = useShoppingCart();
      const { toggleWishlist, isInWishlist } = useWishlist();
      const isWishlisted = isInWishlist(product.id);

      const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
      };

      const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      };

      const actualPrice = parseFloat(String(product.price).replace(/[.₫]/g, ''));
      const discountPrice = product.originalPrice ? parseFloat(String(product.originalPrice).replace(/[.₫]/g, '')) : actualPrice;
      const discountPercentage = product.originalPrice ? Math.round(((discountPrice - actualPrice) / discountPrice) * 100) : 0;

      return (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex border-border/60 hover:border-primary/50 dark:border-border/30 dark:hover:border-primary/50">
            <Link to={`/product/${product.id}`} className="flex w-full">
              <div className="w-1/3 relative">
                <img  
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  alt={product.alt || product.name}
                 src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                {discountPercentage > 0 && (
                  <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>
              <div className="p-4 flex flex-col justify-between w-2/3">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.shortDescription || "Mô tả ngắn gọn về sản phẩm tuyệt vời này. Nó có nhiều tính năng hữu ích và thiết kế đẹp mắt."}</p>
                  {product.rating && (
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{product.rating}</span>
                      <span className="mx-1">|</span>
                      <span>Đã bán {product.soldCount || 0}</span>
                    </div>
                  )}
                   <div className="text-xs text-muted-foreground mb-2">{product.location || "Toàn quốc"}</div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-baseline space-x-2">
                    <p className="text-primary font-bold text-xl">{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">{product.originalPrice}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-8 w-8 rounded-full ${isWishlisted ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'}`}
                      onClick={handleToggleWishlist}
                    >
                      <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </Button>
                    <Button 
                      size="sm" 
                      className="gradient-shopee text-primary-foreground"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-1.5 h-4 w-4" /> Thêm vào giỏ
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        </motion.div>
      );
    };

    export default ProductListItem;