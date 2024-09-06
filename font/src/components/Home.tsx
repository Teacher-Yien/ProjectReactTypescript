import Typewriter from 'typewriter-effect';  
import { FaShoppingCart } from "react-icons/fa";  
import { FaShuttleVan } from "react-icons/fa";  
import { TiContacts } from "react-icons/ti";  
import { FaRegMoneyBillAlt } from "react-icons/fa";  
import { FaRecycle } from "react-icons/fa";  
import { useState, useEffect } from "react";  
import ProductCard from "./ProductCard";  
import ProductData from './products.json'; // Ensure the path is correct  

interface Product {  
    id: number;  
    name: string;  
    image: string;  
    price: number;
    stock: number;  
    onSale: boolean;  // This should be boolean, not true  
}  

const listCard: Product[] = ProductData.products || []; // Fallback to empty array in case of error  

function Home() {  
    const [Products, setProducts] = useState<Product[]>([]);  
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);  

    const handleProductClick = (product: Product) => {  
        setSelectedProduct(product);  
    };  

    useEffect(() => {  
        setProducts(listCard); // Load products into state  
    }, []);  

    return (  
        <div className="container-fluid bg-body-secondary p-2">  
            <div className="home ">  
                <div className="row align-items-center">  
                    {/* Image Column */}  
                    <div className="col-md-6 col-lg-6 order-2 order-md-1 d-flex justify-content-center mt-5">  
                        <img   
                            src="assets/organic-products-hero-400x343.png"   
                            alt="Organic Products"   
                            className="img-fluid animate__animated animate__zoomInRight"   
                        />  
                    </div>  
                    {/* Text Column */}  
                    <div className="col-md-6 col-lg-6 order-1 order-md-2 d-flex flex-column justify-content-center text-center text-md-start ">  
                        <div className="logo-container">  
                            <img src="assets/logo-leaf-new.png" alt="Logo Leaf" className="logo-img" />  
                        </div>  
                        <h3>Best Quality Products</h3>  
                        <h1>  
                            <Typewriter  
                                options={{  
                                    strings: ['Join The Organic Movement!'],  
                                    autoStart: true,  
                                    loop: true,  
                                }}  
                            />  
                        </h1>  
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>  
                        <div className="d-flex justify-content-center justify-content-md-start mt-3">  
                            <button className="btn btn-primary fixed-size-btn">  
                                <FaShoppingCart /> Shop Now  
                            </button>  
                        </div>  
                    </div>  
                </div>  
            </div>  

            <div className="content bg-dark mt-5 d-flex justify-content-center align-items-center p-2">  
                <div className="container ">  
                    <div className="row">  
                        <div className="col-lg-3 col-md-6 p-2">  
                            <div className="card p-3 d-flex flex-row text-light bg-secondary">  
                                <FaShuttleVan id="icon" />  
                                <div className="text text-center mx-2">  
                                    <h4>Free Shipping</h4>  
                                    <p>Above $5 Only</p>  
                                </div>  
                            </div>  
                        </div>  
                        <div className="col-lg-3 col-md-6 p-2">  
                            <div className="card p-3 d-flex flex-row text-light bg-secondary">  
                                <TiContacts id="icon" />  
                                <div className="text text-center mx-2">  
                                    <h4>Certified Organic</h4>  
                                    <p>100% Guarantee</p>  
                                </div>  
                            </div>  
                        </div>  
                        <div className="col-lg-3 col-md-6 p-2">  
                            <div className="card p-3 d-flex flex-row text-light bg-secondary">  
                                <FaRegMoneyBillAlt id="icon" />  
                                <div className="text text-center mx-2">  
                                    <h4>Huge Savings</h4>  
                                    <p>At Lowest Price</p>  
                                </div>  
                            </div>  
                        </div>  
                        <div className="col-lg-3 col-md-6 p-2">  
                            <div className="card p-3 d-flex flex-row text-light bg-secondary">  
                                <FaRecycle id="icon" />  
                                <div className="text text-center mx-2">  
                                    <h4>Easy Returns</h4>  
                                    <p>No Questions Asked</p>  
                                </div>  
                            </div>  
                        </div>  
                    </div>  
                </div>  
            </div>  

            {/* Card */}  
            <div className="container mt-5">  
                <h1 className="text-center">Best Selling Products</h1>  
                <center className="mt-2 mb-2">  
                    <img src="assets/logo-leaf-new.png" alt="Logo Leaf" className="logo-img" />  
                </center>  
                <div className="row mt-3">  
                    {Products.map((e) => (  
                        <div key={e.id} className="col-lg-3 col-md-6 p-2">  
                            <ProductCard   
                                product={e}  
                                onClick={() => handleProductClick(e)}  
                            />  
                        </div>  
                    ))}  
                </div>  
            </div>  
        </div>  
    );  
}  

export default Home;