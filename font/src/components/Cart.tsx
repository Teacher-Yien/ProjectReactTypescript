// Cart.tsx
import React from 'react';
import { useCart, CartItem } from './CartContext'; // Import CartItem from CartContext

const Cart: React.FC = () => {
    const { cart, getTotalPrice } = useCart();

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item: CartItem, index: number) => (
                        <div key={index}>
                            <p>{item.name} - £{item.price.toFixed(2)}</p>
                        </div>
                    ))}
                    <h6>Subtotal: £{getTotalPrice()}</h6>
                </div>
            )}
        </div>
    );
}

export default Cart;
