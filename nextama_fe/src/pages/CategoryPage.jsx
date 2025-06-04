import React, { useState, useEffect } from 'react';
    import { useParams, useLocation, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Slider } from '@/components/ui/slider';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
    import { ListFilter, Grid, Filter, Star, ChevronDown, ChevronUp, Tag } from 'lucide-react';
    import ProductCard from '@/components/ProductCard';
    import ProductListItem from '@/components/ProductListItem';
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


    const mockProducts = Array(24).fill(null).map((_, i) => ({
      id: i + 1,
      name: `Sản phẩm ${i + 1} đa dạng mẫu mã`,
      price: `${(Math.random() * 1000 + 50).toFixed(0)}.000₫`,
      originalPrice: Math.random() > 0.5 ? `${(Math.random() * 500 + 1050).toFixed(0)}.000₫` : null,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 200),
      soldCount: Math.floor(Math.random() * 1000 + 50),
      image_description: `Hình ảnh cho sản phẩm ${i+1}`,
      alt: `Sản phẩm ${i+1}`,
      location: ["Hà Nội", "TP.HCM", "Đà Nẵng", "Toàn quốc"][Math.floor(Math.random()*4)],
      brand: ["Samsung", "Apple", "Xiaomi", "Coolmate", "Uniqlo", "Nike", "Adidas"][Math.floor(Math.random()*7)],
      category: ["Điện thoại", "Laptop", "Thời trang nam", "Thời trang nữ", "Đồ gia dụng"][Math.floor(Math.random()*5)],
      shortDescription: "Mô tả ngắn gọn, hấp dẫn về sản phẩm này. Chất lượng tuyệt vời, giá cả phải chăng."
    }));
    
    const FilterSection = ({ title, children, defaultOpen = false }) => {
      const [isOpen, setIsOpen] = useState(defaultOpen);
      return (
        <div className="py-3 border-b border-border/70 dark:border-border/30">
          <button
            className="flex justify-between items-center w-full text-left font-semibold text-md mb-2 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {title}
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          {isOpen && <div className="space-y-2 pl-1">{children}</div>}
        </div>
      );
    };


    const CategoryPage = () => {
      const { categoryName } = useParams();
      const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
      const searchTerm = searchParams.get('search');
      const [viewMode, setViewMode] = useState('grid');
      const [filteredProducts, setFilteredProducts] = useState(mockProducts);
      const [sortOption, setSortOption] = useState('Phổ biến');
      const [priceRange, setPriceRange] = useState([0, 5000000]);
      const [selectedBrands, setSelectedBrands] = useState([]);
      const [selectedLocations, setSelectedLocations] = useState([]);
      const [selectedRatings, setSelectedRatings] = useState([]);

      const pageTitle = categoryName 
        ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
        : (searchTerm ? `Kết quả cho "${searchTerm}"` : "Tất Cả Sản Phẩm");

      useEffect(() => {
        let products = mockProducts;
        if (categoryName) {
          const formattedCategory = categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          products = products.filter(p => p.category.toLowerCase() === formattedCategory.toLowerCase());
        }
        if (searchTerm) {
          products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        
        products = products.filter(p => {
            const price = parseFloat(p.price.replace(/[.₫]/g, ''));
            return price >= priceRange[0] && price <= priceRange[1];
        });

        if (selectedBrands.length > 0) {
            products = products.filter(p => selectedBrands.includes(p.brand));
        }
        if (selectedLocations.length > 0) {
            products = products.filter(p => selectedLocations.includes(p.location));
        }
        if (selectedRatings.length > 0) {
            products = products.filter(p => selectedRatings.some(r => parseFloat(p.rating) >= r));
        }


        // Sorting logic
        switch (sortOption) {
          case 'Giá: Tăng dần':
            products.sort((a, b) => parseFloat(a.price.replace(/[.₫]/g, '')) - parseFloat(b.price.replace(/[.₫]/g, '')));
            break;
          case 'Giá: Giảm dần':
            products.sort((a, b) => parseFloat(b.price.replace(/[.₫]/g, '')) - parseFloat(a.price.replace(/[.₫]/g, '')));
            break;
          case 'Đánh giá cao':
            products.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
            break;
          case 'Bán chạy':
            products.sort((a,b) => (b.soldCount || 0) - (a.soldCount || 0));
            break;
          default: // Phổ biến (default or by relevance if implemented)
            products.sort((a,b) => (b.soldCount || 0) * parseFloat(b.rating) - (a.soldCount || 0) * parseFloat(a.rating));
            break;
        }
        setFilteredProducts(products);
      }, [categoryName, searchTerm, sortOption, priceRange, selectedBrands, selectedLocations, selectedRatings]);

      const handleBrandChange = (brand) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
      };
      const handleLocationChange = (location) => {
        setSelectedLocations(prev => prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]);
      };
      const handleRatingChange = (rating) => {
        setSelectedRatings(prev => prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]);
      };
      
      const uniqueBrands = [...new Set(mockProducts.map(p => p.brand))];
      const uniqueLocations = [...new Set(mockProducts.map(p => p.location))];


      return (
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card dark:bg-slate-800 shadow-sm rounded-lg p-4 md:p-6 mb-6"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">{pageTitle}</h1>
              <span className="text-sm text-muted-foreground">{filteredProducts.length} sản phẩm</span>
            </div>
            {searchTerm && <p className="text-muted-foreground mt-1">Hiển thị kết quả tìm kiếm cho: <span className="font-semibold text-primary">{searchTerm}</span></p>}
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <motion.aside 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full md:w-1/4 lg:w-1/5 space-y-1"
            >
              <Card className="shadow-md glassmorphism sticky top-24">
                <CardHeader className="border-b p-4">
                  <CardTitle className="flex items-center text-lg"><Filter className="mr-2 h-5 w-5 text-primary" /> Bộ lọc tìm kiếm</CardTitle>
                </CardHeader>
                <CardContent className="p-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
                  <FilterSection title="Khoảng giá" defaultOpen={true}>
                    <Slider 
                        value={priceRange} 
                        onValueChange={setPriceRange} 
                        max={10000000} 
                        step={50000} 
                        className="my-3" 
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{priceRange[0].toLocaleString()}₫</span>
                      <span>{priceRange[1].toLocaleString()}₫</span>
                    </div>
                  </FilterSection>

                  <FilterSection title="Thương hiệu">
                    {uniqueBrands.slice(0,5).map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={`brand-${brand}`} checked={selectedBrands.includes(brand)} onCheckedChange={() => handleBrandChange(brand)} />
                        <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">{brand}</Label>
                      </div>
                    ))}
                    {uniqueBrands.length > 5 && <Link to="#" className="text-xs text-primary hover:underline mt-1 block">Xem thêm</Link>}
                  </FilterSection>

                  <FilterSection title="Nơi bán">
                     {uniqueLocations.map(loc => (
                      <div key={loc} className="flex items-center space-x-2">
                        <Checkbox id={`loc-${loc}`} checked={selectedLocations.includes(loc)} onCheckedChange={() => handleLocationChange(loc)} />
                        <Label htmlFor={`loc-${loc}`} className="text-sm font-normal cursor-pointer">{loc}</Label>
                      </div>
                    ))}
                  </FilterSection>
                  
                  <FilterSection title="Đánh giá">
                    {[5, 4, 3].map(star => (
                      <div key={star} className="flex items-center space-x-2">
                        <Checkbox id={`star-${star}`} checked={selectedRatings.includes(star)} onCheckedChange={() => handleRatingChange(star)} />
                        <Label htmlFor={`star-${star}`} className="ml-1 flex items-center text-sm font-normal cursor-pointer">
                          {Array(star).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                          {Array(5 - star).fill(0).map((_, i) => <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 dark:text-gray-600" />)}
                          <span className="ml-1.5">Từ {star} sao</span>
                        </Label>
                      </div>
                    ))}
                  </FilterSection>
                  
                  <Button className="w-full mt-4 gradient-shopee text-primary-foreground">Áp dụng bộ lọc</Button>
                  <Button variant="ghost" className="w-full mt-2 text-muted-foreground hover:text-destructive">Xóa tất cả</Button>
                </CardContent>
              </Card>
            </motion.aside>

            <main className="w-full md:w-3/4 lg:w-4/5">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 bg-card dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                    <span className="text-sm text-muted-foreground">Sắp xếp theo:</span>
                    {['Phổ biến', 'Bán chạy', 'Giá: Tăng dần', 'Giá: Giảm dần'].map(opt => (
                        <Button 
                            key={opt}
                            variant={sortOption === opt ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setSortOption(opt)}
                            className={`text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 ${sortOption === opt ? 'gradient-shopee text-primary-foreground' : 'text-muted-foreground hover:bg-accent'}`}
                        >
                            {opt}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')} className="h-8 w-8 md:h-9 md:w-9">
                    <Grid className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                  <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')} className="h-8 w-8 md:h-9 md:w-9">
                    <ListFilter className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout 
                  className={`grid gap-3 md:gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}
                >
                  {filteredProducts.map(product => (
                      viewMode === 'grid' ? <ProductCard key={product.id} product={product} /> : <ProductListItem key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-10">
                    <Tag className="mx-auto h-20 w-20 text-muted-foreground/50 mb-4" />
                    <p className="text-xl text-muted-foreground">Không tìm thấy sản phẩm nào phù hợp.</p>
                    <p className="text-sm text-muted-foreground mt-1">Vui lòng thử điều chỉnh bộ lọc hoặc tìm kiếm từ khóa khác.</p>
                </motion.div>
              )}
              
              {/* Pagination Placeholder */}
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mr-2">Trước</Button>
                <Button>1</Button>
                <Button variant="ghost">2</Button>
                <Button variant="ghost">3</Button>
                <Button variant="outline" className="ml-2">Sau</Button>
              </div>
            </main>
          </div>
        </div>
      );
    };

    export default CategoryPage;