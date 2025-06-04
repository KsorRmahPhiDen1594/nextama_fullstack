import React, { createContext, useContext, useState, useEffect } from 'react';
    import { useToast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/AuthContext';

    const WishlistContext = createContext();

    export const useWishlist = () => useContext(WishlistContext);

    export const WishlistProvider = ({ children }) => {
      const [wishlistItems, setWishlistItems] = useState([]);
      const { toast } = useToast();
      const { currentUser } = useAuth();

      useEffect(() => {
        if (currentUser) {
          const storedWishlist = localStorage.getItem(`wishlist_${currentUser.id}`);
          if (storedWishlist) {
            setWishlistItems(JSON.parse(storedWishlist));
          }
        } else {
          setWishlistItems([]);
        }
      }, [currentUser]);

      useEffect(() => {
        if (currentUser) {
          localStorage.setItem(`wishlist_${currentUser.id}`, JSON.stringify(wishlistItems));
        }
      }, [wishlistItems, currentUser]);

      const toggleWishlist = (product) => {
        if (!currentUser) {
          toast({ variant: "destructive", title: "Vui lòng đăng nhập", description: "Bạn cần đăng nhập để sử dụng danh sách yêu thích." });
          return;
        }
        setWishlistItems(prevItems => {
          const isWishlisted = prevItems.some(item => item.id === product.id);
          if (isWishlisted) {
            toast({ title: "Đã xóa khỏi Yêu thích", description: `${product.name} đã được xóa khỏi danh sách yêu thích.` });
            return prevItems.filter(item => item.id !== product.id);
          } else {
            toast({ title: "Đã thêm vào Yêu thích!", description: `${product.name} đã được thêm vào danh sách yêu thích.` });
            return [...prevItems, product];
          }
        });
      };
      
      const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
      };

      return (
        <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, setWishlistItems }}>
          {children}
        </WishlistContext.Provider>
      );
    };