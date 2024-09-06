import React from 'react';  
import ReactDOM from 'react-dom/client';  
import App from './App.tsx'; // Your main application component  
import "./App.css";  
import "animate.css";  
import 'bootstrap/dist/css/bootstrap.css';  
import 'bootstrap/dist/js/bootstrap.js';  
import AOS from 'aos';  
import 'aos/dist/aos.css';  
AOS.init();  

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Add from './components/AddProducts.tsx';  
import Home from './components/Home.tsx';  
import AllProducts from './components/AllProducts.tsx';  
import About from './components/About.tsx';  
import Contact from './components/Contact';  
import ProductDetail from './components/ProductDetail.tsx';  
import { CartProvider } from './components/CartContext.tsx';
import Cart from './components/Cart.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>  
    <CartProvider> {/* Wrap the application with CartProvider */}  
      <Router>  
          <Routes>  
            <Route path='/' element={<App />}>  
                <Route path='/home' element={<Home />} />  
                <Route path='/add' element={<Add />} />  
                <Route path='/all' element={<AllProducts />} />  
                <Route path='/about' element={<About />} />  
                <Route path='/contact' element={<Contact />} />  
                <Route path="/product/:id" element={<ProductDetail />} />  // No product prop passed here  
                <Route path="/cart" element={<Cart />} />   
            </Route>  
          </Routes>
      </Router>  
    </CartProvider>  
  </React.StrictMode>,  
);