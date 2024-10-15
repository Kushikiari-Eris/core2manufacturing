import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const userId = Cookies.get('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            const cartKey = `cart_${userId}`;
            const items = localStorage.getItem(cartKey) ? JSON.parse(localStorage.getItem(cartKey)) : [];
            setCartItems(items);
        }
    }, [userId]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0); // Include quantity in total calculation
    };

    const handleCheckout = () => {
        navigate('/market/checkout', { state: { cartItems, total: calculateTotal() } });
    };

    return (
        <>
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="min-h-screen p-8 grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow py-16 px-8 mt-10">
                {/* Left Section: Contact, Shipping Address, Payment Details */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6">Contact</h1>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full border border-gray-300 p-2 mb-4 rounded"
                    />
                    <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full border border-gray-300 p-2 mb-4 rounded"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        className="w-full border border-gray-300 p-2 mb-4 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Postal Code"
                        className="w-full border border-gray-300 p-2 mb-4 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        className="w-full border border-gray-300 p-2 mb-4 rounded"
                    />
                    <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
                    <input
                        type="text"
                        placeholder="Card Details"
                        className="w-full border border-gray-300 p-2 mb-4 rounded"
                    />
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Expiration Date"
                            className="w-1/2 border border-gray-300 p-2 mr-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="CVC"
                            className="w-1/2 border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <button className="bg-gray-200 px-4 py-2 rounded">I agree to Terms and Conditions</button>
                </div>

                {/* Right Section: Order Summary */}
                <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-6">Order Summary</h2>
                    {cartItems.length > 0 ? (
                        <div>
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex mb-4">
                                  <img src={`http://localhost:7684/uploads/${item.image}`} alt={item.productName} className="w-20 h-20 object-cover rounded-md mr-4"/>
                                    <div>
                                        <p>{item.productName}</p>
                                        <p>Quantity: {item.quantity || 1}</p>
                                    </div>
                                    <p className='flex justify-end'>₱{item.price * (item.quantity || 1)}</p> {/* Multiply by quantity */}
                                </div>
                            ))}
                            <div className="flex justify-between font-bold mb-2">
                                <p>Subtotal</p>
                                <p>₱{calculateTotal()}</p>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p>Shipping Fee</p>
                                <p>₱10</p>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p>Tax Estimate</p>
                                <p>₱0</p>
                            </div>
                            <div className="flex justify-between font-bold">
                                <p>Order Total</p>
                                <p>₱{calculateTotal() + 10}</p> {/* Include shipping fee in total */}
                            </div>
                        </div>
                    ) : (
                        <p>No items in the cart.</p>
                    )}
                </div>
            </div>
            <Footer />
            </div>
        </>
    );
};

export default Cart;
