import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
    import { Badge } from '@/components/ui/badge';
    import { Users, Plus, MoreHorizontal, Search, Edit, Trash2, Lock, Unlock, MailWarning, ShieldCheck } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    // Dialog components would be needed for add/edit user modals
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


    const AdminUserManagementPage = () => {
      const [users, setUsers] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [filterRole, setFilterRole] = useState('all');
      const [filterStatus, setFilterStatus] = useState('all');
      const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
      const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
      const [currentUserToEdit, setCurrentUserToEdit] = useState(null);
      const [newUserData, setNewUserData] = useState({ name: '', email: '', password: '', role: 'user' });
      const { toast } = useToast();

      useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        // Add a default admin if none exists for testing
        if (!storedUsers.some(u => u.role === 'admin')) {
            storedUsers.push({ id: 'admin001', name: 'Default Admin', email: 'admin@NextAma.com', password: 'password', role: 'admin', status: 'active', joinedDate: new Date().toISOString().split('T')[0] });
            localStorage.setItem('users', JSON.stringify(storedUsers));
        }
        setUsers(storedUsers.map(u => ({ ...u, status: u.status || 'active', joinedDate: u.joinedDate || new Date().toISOString().split('T')[0] })));
      }, []);

      const handleAddUser = () => {
        if (!newUserData.name || !newUserData.email || !newUserData.password) {
            toast({ variant: "destructive", title: "Lỗi", description: "Vui lòng điền đầy đủ thông tin." });
            return;
        }
        const newUser = { 
            id: `user${Date.now()}`, 
            ...newUserData, 
            status: 'active', 
            joinedDate: new Date().toISOString().split('T')[0] 
        };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        toast({ title: "Thành công", description: `Đã thêm người dùng ${newUser.name}.` });
        setIsAddUserModalOpen(false);
        setNewUserData({ name: '', email: '', password: '', role: 'user' });
      };

      const handleEditUser = () => {
        if (!currentUserToEdit || !newUserData.name || !newUserData.email) {
            toast({ variant: "destructive", title: "Lỗi", description: "Thông tin không hợp lệ." });
            return;
        }
        const updatedUsers = users.map(u => u.id === currentUserToEdit.id ? { ...u, ...newUserData, password: newUserData.password || u.password } : u);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        toast({ title: "Thành công", description: `Đã cập nhật người dùng ${newUserData.name}.` });
        setIsEditUserModalOpen(false);
        setCurrentUserToEdit(null);
        setNewUserData({ name: '', email: '', password: '', role: 'user' });
      };
      
      const openEditModal = (user) => {
        setCurrentUserToEdit(user);
        setNewUserData({ name: user.name, email: user.email, password: '', role: user.role }); // Don't prefill password for editing
        setIsEditUserModalOpen(true);
      };


      const toggleUserStatus = (userId) => {
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, status: user.status === 'active' ? 'locked' : 'active' } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        const user = users.find(u => u.id === userId);
        toast({ title: "Cập nhật trạng thái", description: `Người dùng ${user.name} đã được ${user.status === 'active' ? 'mở khóa' : 'khóa'}.` });
      };

      const deleteUser = (userId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.")) {
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            toast({ title: "Xóa thành công", description: "Người dùng đã được xóa." });
        }
      };
      
      const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesRole && matchesStatus;
      });

      return (
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-between items-center"
          >
            <h1 className="text-3xl font-bold flex items-center"><Users className="mr-3 h-8 w-8 text-primary"/>Quản lý Người dùng</h1>
            <Button onClick={() => setIsAddUserModalOpen(true)} className="gradient-shopee text-primary-foreground">
              <Plus className="mr-2 h-5 w-5" /> Thêm người dùng mới
            </Button>
          </motion.div>

          <Card className="shadow-lg">
            <CardHeader className="p-4 border-b">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Tìm theo tên, email..." 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={filterRole} onValueChange={setFilterRole}>
                        <SelectTrigger className="w-full md:w-[150px]">
                            <SelectValue placeholder="Vai trò" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả vai trò</SelectItem>
                            <SelectItem value="user">Người dùng</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="superadmin">Super Admin</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full md:w-[150px]">
                            <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả trạng thái</SelectItem>
                            <SelectItem value="active">Hoạt động</SelectItem>
                            <SelectItem value="locked">Bị khóa</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Avatar</TableHead>
                    <TableHead>Tên người dùng</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Ngày tham gia</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right w-[100px]">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell>
                         <img  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=${user.role === 'admin' || user.role === 'superadmin' ? 'ff7f50' : '60a5fa'}&radius=50`} alt="avatar" className="h-10 w-10 rounded-full border" />
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' || user.role === 'superadmin' ? 'default' : 'secondary'} className={user.role === 'superadmin' ? 'bg-red-600 hover:bg-red-700' : (user.role === 'admin' ? 'bg-orange-500 hover:bg-orange-600' : '')}>
                            {user.role === 'user' && 'Người dùng'}
                            {user.role === 'admin' && 'Admin'}
                            {user.role === 'superadmin' && 'Super Admin'}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinedDate}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'outline' : 'destructive'} className={user.status === 'active' ? 'border-green-500 text-green-600' : ''}>
                          {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Mở menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openEditModal(user)}><Edit className="mr-2 h-4 w-4"/>Sửa thông tin</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                              {user.status === 'active' ? <Lock className="mr-2 h-4 w-4"/> : <Unlock className="mr-2 h-4 w-4"/>}
                              {user.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}
                            </DropdownMenuItem>
                            <DropdownMenuItem><MailWarning className="mr-2 h-4 w-4"/>Gửi cảnh báo</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => deleteUser(user.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                              <Trash2 className="mr-2 h-4 w-4"/>Xóa người dùng
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredUsers.length === 0 && <p className="p-4 text-center text-muted-foreground">Không tìm thấy người dùng nào.</p>}
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="text-xs text-muted-foreground">
                Hiển thị <strong>{filteredUsers.length}</strong> trên tổng số <strong>{users.length}</strong> người dùng.
              </div>
              {/* Pagination can be added here */}
            </CardFooter>
          </Card>

          {/* Add User Modal */}
          <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thêm người dùng mới</DialogTitle>
                <DialogDescription>Điền thông tin chi tiết để tạo tài khoản người dùng mới.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-name" className="text-right">Tên</Label>
                  <Input id="new-name" value={newUserData.name} onChange={(e) => setNewUserData({...newUserData, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-email" className="text-right">Email</Label>
                  <Input id="new-email" type="email" value={newUserData.email} onChange={(e) => setNewUserData({...newUserData, email: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-password" className="text-right">Mật khẩu</Label>
                  <Input id="new-password" type="password" value={newUserData.password} onChange={(e) => setNewUserData({...newUserData, password: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-role" className="text-right">Vai trò</Label>
                  <Select value={newUserData.role} onValueChange={(value) => setNewUserData({...newUserData, role: value})}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="user">Người dùng</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserModalOpen(false)}>Hủy</Button>
                <Button onClick={handleAddUser} className="gradient-shopee text-primary-foreground">Thêm người dùng</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit User Modal */}
          {currentUserToEdit && (
            <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa người dùng: {currentUserToEdit.name}</DialogTitle>
                    <DialogDescription>Cập nhật thông tin cho người dùng.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">Tên</Label>
                    <Input id="edit-name" value={newUserData.name} onChange={(e) => setNewUserData({...newUserData, name: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-email" className="text-right">Email</Label>
                    <Input id="edit-email" type="email" value={newUserData.email} onChange={(e) => setNewUserData({...newUserData, email: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-password" className="text-right">Mật khẩu mới</Label>
                    <Input id="edit-password" type="password" placeholder="Để trống nếu không đổi" value={newUserData.password} onChange={(e) => setNewUserData({...newUserData, password: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-role" className="text-right">Vai trò</Label>
                    <Select value={newUserData.role} onValueChange={(value) => setNewUserData({...newUserData, role: value})}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="user">Người dùng</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="superadmin">Super Admin</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => { setIsEditUserModalOpen(false); setCurrentUserToEdit(null); }}>Hủy</Button>
                    <Button onClick={handleEditUser} className="gradient-shopee text-primary-foreground">Lưu thay đổi</Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
          )}

        </div>
      );
    };

    export default AdminUserManagementPage;