import { Link, Outlet, NavLink } from 'react-router-dom';
import './App.css';
import { BsCart4 } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useCart } from './components/CartContext';

function App() {
    const { getTotalPrice, cart, addToCart, removeFromCart } = useCart(); // Include addToCart and removeFromCart

    const handleChangeQuantity = (id: number, newQty: number) => {
        // Find the item in the cart
        const item = cart.find((item) => item.id === id);
    
        if (!item) return; // If the item is not found, exit the function
    
        // If the new quantity is less than 1, remove the item from the cart
        if (newQty < 1) {
            removeFromCart(id);
        } else if (newQty > item.stock) {
            // If the new quantity exceeds the stock, show an error
            console.error(`Cannot add more than ${item.stock} items of ${item.name} to the cart.`);
            alert(`Only ${item.stock} items of ${item.name} are in stock.`);
        } else {
            // Otherwise, update the quantity in the cart
            // Remove the item if its quantity is 0 or less (optional, based on your cart logic)
            if (newQty === 0) {
                removeFromCart(id);
            } else {
                addToCart({ ...item, quantity: newQty });
            }
        }
    };
    

    return (
        <>
            <div className="container-fluid">
                <header>
                    <div className="header">
                        <nav className="navbar navbar-expand-lg bg-body-secondary">
                            <div className="container-fluid">
                                <div className="navbar-brand">
                                    <Link to={'/home'}>
                                        <img src='/assets/organic-store-logo5.svg' alt="" />
                                    </Link>
                                </div>
                                <button
                                    className="btn btn-success navbar-toggler bg-success text-light"
                                    data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                                >
                                    <FaBars />
                                </button>
                                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                                    <div className="navbar-nav">
                                        <NavLink id="li" className={({ isActive }) => isActive ? "text-success" : "text-dark"} to={'/home'}>Home</NavLink>
                                        <NavLink id="li" className={({ isActive }) => isActive ? "text-success" : "text-dark"} to={'/all'}>All Products</NavLink>
                                        <NavLink id="li" className={({ isActive }) => isActive ? "text-success" : "text-dark"} to={'/about'}>About</NavLink>
                                        <NavLink id="li" className={({ isActive }) => isActive ? "text-success" : "text-dark"} to={'/contact'}>Contact</NavLink>
                                        <NavLink id="li" to={'/cart'} className={({ isActive }) => isActive ? "text-success" : "text-dark"}>
                                            <span>${getTotalPrice()}</span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <BsCart4
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                cursor={"pointer"}
                            />
                        </nav>
                    </div>
                </header>
                <div className="offcanvas offcanvas-end" tabIndex='-1' id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Cart</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        {
                            cart.length === 0 ? (
                                <h3>Your cart is empty.</h3>
                            ) : (
                                <div>
                                    {cart.map((item, index) => (
                                        <div key={index} className='d-flex justify-content-between align-items-center mb-4'>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{ width: "50px", height: "50px" }}
                                                    className='rounded-circle'
                                                />
                                                <div>
                                                    <p className='mb-0 mx-3'>{item.name}</p>
                                                    <p className='mb-0 mx-3'>
                                                        {item.quantity} x ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div>
                                                    {/* Decrease Quantity Button */}
                                                    <button
                                                        className='mx-2'
                                                        onClick={() => {
                                                            if (item.quantity > 1) {
                                                                handleChangeQuantity(item.id, item.quantity - 1);
                                                            } else {
                                                                alert('Cannot decrease the quantity below 1.');
                                                            }
                                                        }}
                                                        disabled={item.quantity <= 1} // Disable button if quantity is 1 or less
                                                        title={item.quantity <= 1 ? 'Cannot decrease below 1' : ''}
                                                    >
                                                        -
                                                    </button>

                                                    {/* Increase Quantity Button */}
                                                    <button
                                                        className='mx-2'
                                                        onClick={() => {
                                                            if (item.quantity < item.stock) {
                                                                handleChangeQuantity(item.id, item.quantity + 1);
                                                            } else {
                                                                alert(`Cannot exceed available stock of ${item.stock}.`);
                                                            }
                                                        }}
                                                        disabled={item.quantity >= item.stock} // Disable button if quantity reaches or exceeds stock
                                                        title={item.quantity >= item.stock ? 'Cannot exceed available stock' : ''}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <button className='btn-close' onClick={() => removeFromCart(item.id)}></button>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="body bg-body-secondary">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default App;
