import { useNavigate } from "react-router-dom";
function ProductCard({product}:any){
        const navigate = useNavigate();

        const handleClick = () =>{
            navigate(`/product/${product.id}`);
        }

        const renderStars = (rating:any) =>{
            const stars = [];
            for(let i=1;i<=5;i++){
                stars.push(
                    <span key={i} className={i <= rating? "star fail":"Star"}>
                        ⭐
                    </span>
                )
            }
            return stars
        }
        

    return(
        <div
        data-aos="fade-down"
        className=" product-card" onClick={handleClick} style={{cursor:"pointer"}}>
           <img src={product.image} className=" card-img" alt={product.name} />
           <div className=" card-body">
                <p className=" category text-center">{product.category || 'Groceries'}</p>
                <h5 className=" product-name text-center">{product.name}</h5>
                <div className="rating">{renderStars(product.rating)}</div>
                <p className=" price text-center">
                    <del style={{color:"red"}} className=" original-price mx-2">${(product.price * 1.2).toFixed(2)}</del>
                    <span className=" sale-price mx-2">${(product.price * 1.2).toFixed(2)}</span>
                </p>
           </div>
        </div>
    )
}
export default ProductCard