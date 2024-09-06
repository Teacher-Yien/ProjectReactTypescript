import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartItem, useCart } from './CartContext';
import ProductData from './products.json';  // Import your product data

interface Product {  // Define the type that matches your JSON structure
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  onSale: boolean;
}

const ProductDetail: React.FC = () => {
  const { addToCart, error, clearError } = useCart();  
  const [product, setProduct] = useState<Product | null>(null);  // Use the Product type here
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams<{ id: string }>();  

  useEffect(() => {
    if (error) {
      alert(error); 
      clearError(); 
    }
  }, [error, clearError]);

  useEffect(() => {
    // Use the correct type inference or specify it directly if needed
    const foundProduct = ProductData.products.find((prod: Product) => prod.id.toString() === id);
    setProduct(foundProduct || null);  // Set the product or null if not found
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      if (quantity > product.stock) {
        alert(`Cannot add more than ${product.stock} items to cart.`);
        return;
      }
      const cartItem: CartItem = { ...product, quantity };  
      addToCart(cartItem); 
    }
  };

  if (!product) return <div>Loading or Product not found...</div>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: '200px', height: 'auto' }} />
      <p>Price: £{product.price.toFixed(2)} + Free Shipping</p>
      <p>{product.description}</p>
      <p>Stock: {product.stock} available</p>
      <p>{product.onSale ? "On Sale!" : "Regular Price"}</p>

      <div className="quantity-selector">
        <button className='btn btn-dark mx-2' onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          min="1"
          max={product.stock}
          style={{ width: "40px" }}
        />
        <button className='btn btn-success mx-2' onClick={() => setQuantity(Math.min(quantity + 1, product.stock))}>+</button>
      </div>

      <button className="btn btn-success" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
