import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image?: string;
  description?: string;
  onSale?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => string;
  error: string | null;  // Add error state
  clearError: () => void;  // Function to clear error state
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addToCart = (item: CartItem) => {
    try {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        if (existingItem.quantity + item.quantity > existingItem.stock) {
          throw new Error("Insufficient stock to add more items.");
        }
        setCart(cart.map(cartItem =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity:  item.quantity }
            : cartItem
        ));
      } else {
        setCart([...cart, { ...item, quantity: item.quantity }]);
      }
    } catch (err:any) {
      setError(err.message);  // Set error message
    }
  };

  const removeFromCart = (id: number) => {
    if (cart.length === 0) {
      setError("Cart is empty, cannot remove item.");
      return;
    }
    const updatedCart = cart.filter(cartItem => cartItem.id !== id);
    if (updatedCart.length === cart.length) {
      setError("Item not found in cart.");
      return;
    }
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    try {
      return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    } catch {
      setError("Error calculating total price.");
      return "0.00";
    }
  };

  const clearError = () => setError(null);  // Function to clear the error

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice, error, clearError }}>
      {error && <div className="error-message">{error}</div>}
      {children}
    </CartContext.Provider>
  );
};
