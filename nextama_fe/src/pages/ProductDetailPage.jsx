import React, { useState, useEffect } from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
    import { Star, ShoppingCart, Minus, Plus, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck, Truck, PlayCircle, ThumbsUp, ThumbsDown, Image as ImageIcon, X, Heart } from 'lucide-react';
    import ProductCard from '@/components/ProductCard.jsx';
    import { useShoppingCart } from '@/contexts/ShoppingCartContext.jsx';
    import { useWishlist } from '@/contexts/WishlistContext.jsx';
    import { useToast } from '@/components/ui/use-toast';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


    const mockProduct = {
      id: "1",
      name: "Áo Thun Cotton Cao Cấp Siêu Mát In Họa Tiết Độc Quyền",
      price: "249.000₫",
      originalPrice: "350.000₫",
      rating: 4.8,
      reviewsCount: 1256,
      soldCount: "5.2k+",
      description: "Áo thun nam nữ unisex form rộng tay lỡ vải cotton 100% cao cấp, dày dặn, mềm mại, thoáng mát, thấm hút mồ hôi tốt. Form áo oversize hiện đại, phù hợp với mọi vóc dáng. Thiết kế basic, dễ phối đồ, mang đậm phong cách Hàn Quốc trẻ trung, năng động. Họa tiết in độc quyền, sắc nét, bền màu.",
      images: [
        { type: 'image', src_placeholder: 'Áo thun trắng mặt trước', alt: 'Áo thun trắng mặt trước' },
        { type: 'image', src_placeholder: 'Áo thun trắng mặt sau', alt: 'Áo thun trắng mặt sau' },
        { type: 'image', src_placeholder: 'Chi tiết vải áo thun', alt: 'Chi tiết vải áo thun' },
        { type: 'image', src_placeholder: 'Người mẫu nam mặc áo thun', alt: 'Người mẫu nam mặc áo thun' },
        { type: 'image', src_placeholder: 'Người mẫu nữ mặc áo thun', alt: 'Người mẫu nữ mặc áo thun' },
        { type: 'video', src_placeholder: 'Video giới thiệu áo thun', thumbnail_placeholder: 'Thumbnail video áo thun', alt: 'Video giới thiệu áo thun' }
      ],
      variants: {
        color: ["Trắng", "Đen", "Xám Tro", "Xanh Navy", "Be Kem"],
        size: ["S", "M", "L", "XL", "XXL"],
      },
      seller: { 
        name: "ShopeeCharm Official Store", 
        avatar_placeholder: "Logo ShopeeCharm Official Store",
        rating: "4.9/5.0",
        reviews: "35.6k", 
        products: 1500, 
        responseRate: "98%", 
        responseTime: "Trong vài phút",
        joined: "3 năm trước",
        isOfficial: true,
        location: "TP. Hồ Chí Minh"
      },
      stock: 865,
      shippingInfo: "Miễn phí vận chuyển cho đơn hàng từ 150.000₫",
      returnPolicy: "Đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất hoặc không vừa ý (có điều kiện).",
      highlights: ["Chất liệu cotton 100% thoáng mát", "Form oversize chuẩn Hàn Quốc", "Họa tiết in bền màu, độc đáo", "Đường may tỉ mỉ, chắc chắn"]
    };

    const mockReviews = [
      { id: 1, user: "Nguyễn Văn B", avatar_placeholder: "Avatar Nguyễn Văn B", rating: 5, comment: "Áo đẹp lắm shop ơi, vải mát, form chuẩn. Sẽ ủng hộ tiếp!", date: "2025-05-25", images: ["Ảnh review áo 1", "Ảnh review áo 2"], likes: 15, dislikes: 0 },
      { id: 2, user: "Trần Thị C", avatar_placeholder: "Avatar Trần Thị C", rating: 4, comment: "Chất vải ổn, giao hàng nhanh. Màu xám hơi đậm hơn ảnh một chút nhưng vẫn đẹp.", date: "2025-05-23", images: [], likes: 8, dislikes: 1 },
      { id: 3, user: "Lê Văn D", avatar_placeholder: "Avatar Lê Văn D", rating: 5, comment: "Tuyệt vời! Mua cho cả nhóm bạn ai cũng thích. Giá hợp lý.", date: "2025-05-20", images: ["Ảnh review nhóm bạn mặc áo"], likes: 22, dislikes: 0 },
    ];
    
    const relatedProducts = Array(4).fill(null).map((_, i) => ({
      id: `related${i + 100}`,
      name: `Sản phẩm liên quan ${i + 1}`,
      price: `${(Math.random() * 500 + 100).toFixed(0)}.000₫`,
      originalPrice: Math.random() > 0.5 ? `${(Math.random() * 200 + 600).toFixed(0)}.000₫` : null,
      rating: (Math.random() * 1 + 4).toFixed(1),
      soldCount: Math.floor(Math.random() * 500 + 20),
      image_description: `Hình ảnh sản phẩm liên quan ${i+1}`,
      alt: `Sản phẩm liên quan ${i+1}`
    }));


    const ProductDetailPage = () => {
      const { id } = useParams(); 
      const product = mockProduct; 
      const { addToCart } = useShoppingCart();
      const { toggleWishlist, isInWishlist } = useWishlist();
      const { toast } = useToast();
      const navigate = useNavigate();

      const [quantity, setQuantity] = useState(1);
      const [selectedColor, setSelectedColor] = useState(product.variants.color[0]);
      const [selectedSize, setSelectedSize] = useState(product.variants.size[1]);
      const [mainMediaIndex, setMainMediaIndex] = useState(0);
      const [showImageModal, setShowImageModal] = useState(false);
      const [modalImageSrc, setModalImageSrc] = useState('');
      
      const isWishlisted = isInWishlist(product.id);

      const handleAddToCart = () => {
        addToCart(product, quantity, { color: selectedColor, size: selectedSize });
      };
      
      const handleToggleWishlist = () => {
        toggleWishlist(product);
      };

      const openImageModal = (srcPlaceholder) => {
        setModalImageSrc(srcPlaceholder); 
        setShowImageModal(true);
      };
      
      const discountPercentage = product.originalPrice ? Math.round(((parseFloat(product.originalPrice.replace(/[.₫]/g, '')) - parseFloat(product.price.replace(/[.₫]/g, ''))) / parseFloat(product.originalPrice.replace(/[.₫]/g, ''))) * 100) : 0;

      return (
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card dark:bg-slate-800 shadow-sm rounded-lg p-4 md:p-6 mb-6"
          >
             <nav className="text-sm text-muted-foreground mb-2">
                <Link to="/" className="hover:text-primary">Trang chủ</Link> &gt; 
                <Link to="/category/thoi-trang-nam" className="hover:text-primary"> Thời trang nam</Link> &gt; 
                <span className="text-foreground"> {product.name}</span>
            </nav>
          </motion.div>

          <Card className="shadow-lg overflow-hidden">
            <CardContent className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
              {/* Image Gallery & Video */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <div className="relative mb-3 border rounded-lg overflow-hidden shadow-md aspect-square">
                  {product.images[mainMediaIndex].type === 'image' ? (
                    <img  
                      className="w-full h-full object-cover cursor-pointer" 
                      alt={product.images[mainMediaIndex].alt}
                      src="https://images.unsplash.com/photo-1677693972403-db681288b5da" 
                      onClick={() => openImageModal(product.images[mainMediaIndex].src_placeholder)} />
                  ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center relative">
                       <img  
                        className="w-full h-full object-contain opacity-50" 
                        alt={product.images[mainMediaIndex].alt}
                       src="https://images.unsplash.com/photo-1674027392842-29f8354e236c" />
                      <PlayCircle className="absolute h-20 w-20 text-white/80 cursor-pointer hover:text-white transition-colors" onClick={() => alert("Play video!")}/>
                    </div>
                  )}
                  
                  <Button variant="ghost" size="icon" onClick={() => setMainMediaIndex(prev => (prev - 1 + product.images.length) % product.images.length)} className="absolute top-1/2 left-1 md:left-2 transform -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 text-white h-8 w-8 md:h-10 md:w-10">
                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setMainMediaIndex(prev => (prev + 1) % product.images.length)} className="absolute top-1/2 right-1 md:right-2 transform -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 text-white h-8 w-8 md:h-10 md:w-10">
                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                  </Button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((media, index) => (
                    <button 
                      key={index} 
                      onClick={() => setMainMediaIndex(index)} 
                      className={`rounded-md overflow-hidden border-2 aspect-square ${mainMediaIndex === index ? 'border-primary ring-2 ring-primary/50' : 'border-transparent hover:border-primary/30'}`}
                    >
                      {media.type === 'image' ? (
                        <img  className="w-full h-full object-cover" alt={`Thumbnail ${media.alt}`} src="https://images.unsplash.com/photo-1694878981885-7647baf0d957" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center relative">
                          <img  className="w-full h-full object-cover opacity-70" alt={`Thumbnail ${media.alt}`} src="https://images.unsplash.com/photo-1694878981885-7647baf0d957" />
                          <PlayCircle className="absolute h-6 w-6 text-primary/80"/>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay:0.1 }}
                className="lg:col-span-3 space-y-4 md:space-y-5"
              >
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">{product.name}</h1>
                <div className="flex items-center space-x-3 text-sm md:text-md">
                  <div className="flex items-center">
                    <span className="text-yellow-500 font-semibold mr-1">{product.rating}</span>
                    <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <span className="font-medium">{product.reviewsCount.toLocaleString()} <span className="text-muted-foreground font-normal">Đánh giá</span></span>
                  <span className="text-muted-foreground">|</span>
                  <span className="font-medium">{product.soldCount} <span className="text-muted-foreground font-normal">Đã bán</span></span>
                  <Button variant="ghost" size="icon" className={`ml-auto h-8 w-8 ${isWishlisted ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'}`} onClick={handleToggleWishlist}>
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-end space-x-3">
                    <span className="text-3xl md:text-4xl font-bold text-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg md:text-xl text-muted-foreground line-through">{product.originalPrice}</span>
                    )}
                    {discountPercentage > 0 && (
                       <Badge variant="destructive" className="text-sm px-2 py-0.5">-{discountPercentage}%</Badge>
                    )}
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">{product.shippingInfo}</p>
                </div>
                
                <div>
                  <Label className="text-md font-semibold mb-1.5 block">Màu sắc: <span className="font-normal text-muted-foreground">{selectedColor}</span></Label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.color.map(color => (
                      <Button 
                        key={color} 
                        variant={selectedColor === color ? "default" : "outline"}
                        onClick={() => setSelectedColor(color)}
                        className={`min-w-[70px] md:min-w-[80px] text-xs md:text-sm h-8 md:h-9 px-3 ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900' : 'hover:border-primary/70'}`}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-md font-semibold mb-1.5 block">Kích thước: <span className="font-normal text-muted-foreground">{selectedSize}</span></Label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.size.map(size => (
                      <Button 
                        key={size} 
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[45px] md:min-w-[50px] text-xs md:text-sm h-8 md:h-9 px-3 ${selectedSize === size ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900' : 'hover:border-primary/70'}`}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 pt-2">
                  <Label htmlFor="quantity" className="text-md font-semibold">Số lượng:</Label>
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="h-9 w-9 md:h-10 md:w-10 rounded-none">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input 
                      type="number" 
                      id="quantity" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                      className="w-12 md:w-14 h-9 md:h-10 text-center border-y-0 border-x focus-visible:ring-0 rounded-none" 
                    />
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)} className="h-9 w-9 md:h-10 md:w-10 rounded-none">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-muted-foreground text-sm">{product.stock} sản phẩm có sẵn</span>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-3">
                  <Button size="lg" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10 text-base" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Thêm vào giỏ hàng
                  </Button>
                  <Button size="lg" className="flex-1 gradient-shopee text-primary-foreground text-base" onClick={() => { handleAddToCart(); navigate('/cart'); }}>
                    Mua ngay
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center"><ShieldCheck className="h-4 w-4 mr-1.5 text-green-500"/>ShopeeCharm Đảm Bảo</div>
                    <div className="flex items-center"><Truck className="h-4 w-4 mr-1.5 text-blue-500"/>Trả hàng miễn phí 7 ngày</div>
                </div>
              </motion.div>
            </CardContent>
          </Card>

          {/* Seller Info */}
          <Card className="mt-6 md:mt-8 shadow-md">
            <CardHeader className="p-4 md:p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                 <img  className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-primary p-0.5" alt={`${product.seller.name} logo`} src="https://images.unsplash.com/photo-1570260842077-f380fa64e915" />
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-0.5">
                    <CardTitle className="text-lg md:text-xl">{product.seller.name}</CardTitle>
                    {product.seller.isOfficial && <Badge className="bg-primary/80 text-primary-foreground text-xs px-1.5 py-0.5">Official</Badge>}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">Online {product.seller.responseTime.toLowerCase()} | {product.seller.location}</p>
                  <div className="flex space-x-3 mt-1.5 text-xs md:text-sm">
                    <span><span className="font-semibold">{product.seller.rating}</span> Đánh giá</span>
                    <span><span className="font-semibold">{product.seller.products.toLocaleString()}</span> Sản phẩm</span>
                    <span><span className="font-semibold">{product.seller.responseRate}</span> Phản hồi Chat</span>
                  </div>
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs md:text-sm"><MessageSquare className="mr-1.5 h-4 w-4"/> Chat Ngay</Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs md:text-sm border-primary text-primary hover:bg-primary/10">Xem Shop</Button>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          {/* Product Details & Reviews Tabs */}
           <Card className="mt-6 md:mt-8 shadow-md">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 rounded-none rounded-t-lg border-b">
                <TabsTrigger value="description" className="py-3 md:py-4 text-sm md:text-md data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">Mô Tả Sản Phẩm</TabsTrigger>
                <TabsTrigger value="reviews" className="py-3 md:py-4 text-sm md:text-md data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">Đánh Giá ({product.reviewsCount.toLocaleString()})</TabsTrigger>
                <TabsTrigger value="shipping" className="py-3 md:py-4 text-sm md:text-md data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none hidden md:inline-flex">Vận Chuyển & Đổi Trả</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-3">Chi tiết sản phẩm</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4 text-sm md:text-md">
                    {product.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
                </ul>
                <div className="prose dark:prose-invert max-w-none text-sm md:text-md text-foreground/90 dark:text-foreground/80">
                  <p>{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4">Đánh giá từ khách hàng</h3>
                {mockReviews.length > 0 ? (
                  <div className="space-y-6">
                    {mockReviews.map(review => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start space-x-3">
                           <img  className="h-10 w-10 rounded-full" alt={`Avatar của ${review.user}`} src="https://images.unsplash.com/photo-1590383276111-0392dfd402ac" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-sm">{review.user}</span>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex my-1">
                              {Array(5).fill(0).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                            </div>
                            <p className="text-sm text-foreground/90 dark:text-foreground/80 mb-2">{review.comment}</p>
                            {review.images && review.images.length > 0 && (
                              <div className="flex space-x-2 mb-2">
                                {review.images.map((img, idx) => (
                                  <img key={idx} className="h-16 w-16 object-cover rounded border cursor-pointer" alt={`Ảnh review ${idx+1}`} src="https://images.unsplash.com/photo-1592177183170-a4256e44e072" onClick={() => openImageModal(img)} />
                                ))}
                              </div>
                            )}
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              <Button variant="ghost" size="xs" className="p-1 h-auto hover:text-primary"><ThumbsUp className="h-3.5 w-3.5 mr-1"/> Hữu ích ({review.likes})</Button>
                              <Button variant="ghost" size="xs" className="p-1 h-auto hover:text-destructive"><ThumbsDown className="h-3.5 w-3.5 mr-1"/> ({review.dislikes})</Button>
                              <Button variant="ghost" size="xs" className="p-1 h-auto hover:text-primary">Phản hồi</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                     <Button variant="outline" className="w-full mt-4">Xem tất cả đánh giá</Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Chưa có đánh giá nào cho sản phẩm này.</p>
                )}
              </TabsContent>
              <TabsContent value="shipping" className="p-4 md:p-6">
                 <h3 className="text-lg font-semibold mb-2">Thông tin vận chuyển</h3>
                 <p className="text-sm text-muted-foreground mb-4">{product.shippingInfo}</p>
                 <h3 className="text-lg font-semibold mb-2">Chính sách đổi trả</h3>
                 <p className="text-sm text-muted-foreground">{product.returnPolicy}</p>
              </TabsContent>
            </Tabs>
          </Card>
          
          <section className="mt-8 md:mt-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Sản Phẩm Tương Tự</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>

          {/* Image Modal */}
          {showImageModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-4"
              onClick={() => setShowImageModal(false)}
            >
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-3xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img  className="object-contain rounded-lg max-h-[90vh]" alt="Hình ảnh sản phẩm phóng to" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute -top-4 -right-4 md:top-2 md:right-2 bg-white/20 hover:bg-white/40 text-white rounded-full h-10 w-10"
                  onClick={() => setShowImageModal(false)}
                >
                  <X className="h-6 w-6"/>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      );
    };

    export default ProductDetailPage;