import axios from "axios"
import { useState,useEffect } from "react"
interface Product{
    _id:string;
    name:string;
    price:number;
    qty:number;
    range:string[];
    image:string;
}
function AllProducts(){
    const [products,setProducts] = useState<Product[]>([]);
    useEffect(()=>{
        axios.get<Product[]>("http://localhost:3000/ProductDetails")
        .then(response=>{
            setProducts(response.data);
            console.log(response.data);
        })
    },[]);
    return(
        <>
          <h1 className=" text-center">All Products</h1>
          <div className=" container">
            <div className="row">
                {products.length > 0 ? (
                    products.map(e=>(
                        <div className=" col-lg-3">
                            <div className=" card p-2">
                                <img className=" card-img-top" src={e.image} alt={e.name}/>
                                <div className="card-body">
                                    <h5>Name:{e.name}</h5>
                                    <h6>Price: $ {e.price}</h6>
                                    <p>qty: {e.qty}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ):(
                    <div>
                        <h1>No Product available</h1>
                    </div>
                )}
            </div>
          </div>
        </>
    )
}
export default AllProducts