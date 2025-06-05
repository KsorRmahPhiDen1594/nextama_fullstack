import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
    import { Badge } from '@/components/ui/badge';
    import { Package, Plus, MoreHorizontal, Search, Edit, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

    const mockAdminProducts = Array(15).fill(null).map((_, i) => ({
      id: `prod${i + 1}`,
      name: `Sản phẩm mẫu ${i + 1} cho Admin`,
      category: ["Xem Phim", "Nghe Nhạc", "Thời trang", "Đồ gia dụng", "Sách"][Math.floor(Math.random() * 5)],
      price: (Math.random() * 2000000 + 100000).toFixed(0),
      stock: Math.floor(Math.random() * 200),
      status: Math.random() > 0.2 ? 'active' : 'hidden', // active, hidden, violation
      seller: `Shop ABC ${i % 3 + 1}`,
      dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      image_placeholder: `Ảnh sản phẩm mẫu ${i+1}`
    }));

    const AdminProductManagementPage = () => {
      const [products, setProducts] = useState(mockAdminProducts);
      const [searchTerm, setSearchTerm] = useState('');
      const [filterCategory, setFilterCategory] = useState('all');
      const [filterStatus, setFilterStatus] = useState('all');
      const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
      const [currentProduct, setCurrentProduct] = useState(null); // null for add, product object for edit
      const [productFormData, setProductFormData] = useState({
        name: '', category: '', price: '', stock: '', description: '', image_placeholder: ''
      });
      const { toast } = useToast();

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductFormData(prev => ({ ...prev, [name]: value }));
      };
      
      const handleSelectChange = (name, value) => {
        setProductFormData(prev => ({ ...prev, [name]: value }));
      };

      const openModal = (product = null) => {
        setCurrentProduct(product);
        if (product) {
          setProductFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock.toString(),
            description: product.description || `Mô tả chi tiết cho ${product.name}`,
            image_placeholder: product.image_placeholder || `Ảnh cho ${product.name}`
          });
        } else {
          setProductFormData({ name: '', category: '', price: '', stock: '', description: '', image_placeholder: '' });
        }
        setIsAddEditModalOpen(true);
      };

      const handleSubmitProduct = () => {
        if (!productFormData.name || !productFormData.category || !productFormData.price || !productFormData.stock) {
          toast({ variant: "destructive", title: "Lỗi", description: "Vui lòng điền đầy đủ các trường bắt buộc." });
          return;
        }
        if (currentProduct) { // Edit
          const updatedProducts = products.map(p => p.id === currentProduct.id ? { ...p, ...productFormData, price: parseFloat(productFormData.price).toFixed(0), stock: parseInt(productFormData.stock) } : p);
          setProducts(updatedProducts);
          toast({ title: "Thành công", description: `Đã cập nhật sản phẩm ${productFormData.name}.` });
        } else { // Add
          const newProduct = {
            id: `prod${Date.now()}`,
            ...productFormData,
            price: parseFloat(productFormData.price).toFixed(0),
            stock: parseInt(productFormData.stock),
            status: 'active',
            seller: 'Admin Added', // Or some other logic
            dateAdded: new Date().toISOString().split('T')[0]
          };
          setProducts(prev => [newProduct, ...prev]);
          toast({ title: "Thành công", description: `Đã thêm sản phẩm ${newProduct.name}.` });
        }
        setIsAddEditModalOpen(false);
        setCurrentProduct(null);
      };

      const toggleProductStatus = (productId) => {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: p.status === 'active' ? 'hidden' : 'active' } : p));
        const product = products.find(p => p.id === productId);
        toast({ title: "Cập nhật trạng thái", description: `Sản phẩm ${product.name} đã được ${product.status === 'active' ? 'ẩn' : 'hiển thị'}.` });
      };

      const deleteProduct = (productId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
          setProducts(prev => prev.filter(p => p.id !== productId));
          toast({ title: "Xóa thành công", description: "Sản phẩm đã được xóa." });
        }
      };
      
      const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.seller.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
      });
      
      const uniqueCategories = [...new Set(mockAdminProducts.map(p => p.category))];


      return (
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-between items-center"
          >
            <h1 className="text-3xl font-bold flex items-center"><Package className="mr-3 h-8 w-8 text-primary"/>Quản lý Sản phẩm</h1>
            <Button onClick={() => openModal()} className="gradient-shopee text-primary-foreground">
              <Plus className="mr-2 h-5 w-5" /> Thêm sản phẩm mới
            </Button>
          </motion.div>

          <Card className="shadow-lg">
            <CardHeader className="p-4 border-b">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Tìm theo tên sản phẩm, người bán..." 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả danh mục</SelectItem>
                            {uniqueCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                    </Select>
                     <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full md:w-[150px]">
                            <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả trạng thái</SelectItem>
                            <SelectItem value="active">Đang hiển thị</SelectItem>
                            <SelectItem value="hidden">Đang ẩn</SelectItem>
                            <SelectItem value="violation">Vi phạm</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Ảnh</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Kho</TableHead>
                    <TableHead>Người bán</TableHead>
                    <TableHead>Ngày thêm</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right w-[100px]">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map(product => (
                    <TableRow key={product.id} className="hover:bg-muted/50">
                      <TableCell>
                         <img  className="h-10 w-10 rounded object-cover border" alt={product.name} src="https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" />
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{parseInt(product.price).toLocaleString()}₫</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.seller}</TableCell>
                      <TableCell>{product.dateAdded}</TableCell>
                      <TableCell>
                        <Badge variant={
                            product.status === 'active' ? 'outline' : 
                            product.status === 'hidden' ? 'secondary' : 'destructive'
                        } className={product.status === 'active' ? 'border-green-500 text-green-600' : ''}>
                          {product.status === 'active' && 'Hiển thị'}
                          {product.status === 'hidden' && 'Đang ẩn'}
                          {product.status === 'violation' && 'Vi phạm'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openModal(product)}><Edit className="mr-2 h-4 w-4"/>Sửa sản phẩm</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleProductStatus(product.id)}>
                              {product.status === 'active' ? <EyeOff className="mr-2 h-4 w-4"/> : <Eye className="mr-2 h-4 w-4"/>}
                              {product.status === 'active' ? 'Ẩn sản phẩm' : 'Hiển thị'}
                            </DropdownMenuItem>
                            {product.status !== 'violation' && <DropdownMenuItem><AlertCircle className="mr-2 h-4 w-4"/>Báo cáo vi phạm</DropdownMenuItem>}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => deleteProduct(product.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                              <Trash2 className="mr-2 h-4 w-4"/>Xóa sản phẩm
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredProducts.length === 0 && <p className="p-4 text-center text-muted-foreground">Không tìm thấy sản phẩm nào.</p>}
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="text-xs text-muted-foreground">
                Hiển thị <strong>{filteredProducts.length}</strong> trên tổng số <strong>{products.length}</strong> sản phẩm.
              </div>
            </CardFooter>
          </Card>

          <Dialog open={isAddEditModalOpen} onOpenChange={setIsAddEditModalOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{currentProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</DialogTitle>
                    <DialogDescription>
                        {currentProduct ? `Cập nhật thông tin cho sản phẩm: ${currentProduct.name}` : 'Điền thông tin chi tiết cho sản phẩm mới.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prod-name" className="text-right">Tên SP</Label>
                        <Input id="prod-name" name="name" value={productFormData.name} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prod-category" className="text-right">Danh mục</Label>
                        <Select value={productFormData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                                {uniqueCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                <SelectItem value="Khác">Khác</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prod-price" className="text-right">Giá (VNĐ)</Label>
                        <Input id="prod-price" name="price" type="number" value={productFormData.price} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prod-stock" className="text-right">Tồn kho</Label>
                        <Input id="prod-stock" name="stock" type="number" value={productFormData.stock} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="prod-description" className="text-right pt-2">Mô tả</Label>
                        <Textarea id="prod-description" name="description" value={productFormData.description} onChange={handleInputChange} className="col-span-3 min-h-[100px]" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prod-image" className="text-right">Ảnh (placeholder)</Label>
                        <Input id="prod-image" name="image_placeholder" value={productFormData.image_placeholder} onChange={handleInputChange} className="col-span-3" placeholder="Mô tả ảnh hoặc URL" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddEditModalOpen(false)}>Hủy</Button>
                    <Button onClick={handleSubmitProduct} className="gradient-shopee text-primary-foreground">
                        {currentProduct ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
                    </Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    };

    export default AdminProductManagementPage;