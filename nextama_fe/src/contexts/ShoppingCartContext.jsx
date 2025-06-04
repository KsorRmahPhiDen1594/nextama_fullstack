import React, { createContext, useContext, useState, useEffect } from 'react';
    import { useToast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/AuthContext';

    const ShoppingCartContext = createContext();

    export const useShoppingCart = () => useContext(ShoppingCartContext);

    export const ShoppingCartProvider = ({ children }) => {
      const [cartItems, setCartItems] = useState([]);
      const { toast } = useToast();
      const { currentUser } = useAuth();

      useEffect(() => {
        if (currentUser) {
          const storedCart = localStorage.getItem(`cart_${currentUser.id}`);
          if (storedCart) {
            setCartItems(JSON.parse(storedCart));
          } else {
            setCartItems([]); 
          }
        } else {
          setCartItems([]); 
        }
      }, [currentUser]);

      useEffect(() => {
        if (currentUser) {
          localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cartItems));
        }
      }, [cartItems, currentUser]);

      const addToCart = (product, quantity = 1, variant = null) => {
        if (!currentUser) {
          toast({ variant: "destructive", title: "Vui lòng đăng nhập", description: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng." });
          return;
        }
        setCartItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === product.id && JSON.stringify(item.variant) === JSON.stringify(variant));
          if (existingItem) {
            return prevItems.map(item =>
              item.id === product.id && JSON.stringify(item.variant) === JSON.stringify(variant)
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            return [...prevItems, { ...product, quantity, variant }];
          }
        });
        toast({ title: "Thêm vào giỏ hàng thành công!", description: `${product.name} đã được thêm vào giỏ hàng.` });
      };

      const removeFromCart = (productId, variant = null) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant))));
        toast({ title: "Đã xóa khỏi giỏ hàng", description: "Sản phẩm đã được xóa khỏi giỏ hàng." });
      };

      const updateQuantity = (productId, quantity, variant = null) => {
        if (quantity < 1) {
          removeFromCart(productId, variant);
          return;
        }
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
              ? { ...item, quantity }
              : item
          )
        );
      };

      const clearCart = () => {
        setCartItems([]);
        if (currentUser) {
            localStorage.removeItem(`cart_${currentUser.id}`);
        }
        toast({ title: "Giỏ hàng đã được làm trống." });
      };

      const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
      
      const subtotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[.₫]/g, ''));
        return sum + price * item.quantity;
      }, 0);


      return (
        <ShoppingCartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal }}>
          {children}
        </ShoppingCartContext.Provider>
      );
    };