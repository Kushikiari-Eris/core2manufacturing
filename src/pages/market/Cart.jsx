import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
=======

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
    const userId = Cookies.get('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
<<<<<<< HEAD
            fetchCartItems();
        }
    }, [userId]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:7684/api/cart/${userId}`);
            if (response.status === 200) {
                setCartItems(response.data);
            } else {
                console.error('Failed to fetch cart items');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, index) => {
            const item = cartItems[index];
            return total + item.totalPrice * (item.quantity || 1); // Use totalPrice from cart items
        }, 0);
    };

    const handleCheckout = () => {
        const total = calculateTotal();
        const selectedProducts = selectedItems.map(index => cartItems[index]);
        navigate('/market/checkout', { state: { cartItems: selectedProducts, total } });
    };

    const handleCheckboxChange = (index) => {
        setSelectedItems(prevSelected => {
            if (prevSelected.includes(index)) {
                return prevSelected.filter(i => i !== index); // Uncheck
            }
            return [...prevSelected, index]; // Check
        });
    };

    const handleRemoveItem = async (productId) => {
        console.log('Attempting to remove item with productId:', productId);
        console.log('User ID:', userId); // Check userId
    
        try {
            const response = await axios.delete(`http://localhost:7684/api/cart/${userId}/${productId}`);
            console.log('Remove item response:', response.data);
            setCartItems(cartItems.filter(item => item._id !== productId));
        } catch (error) {
            console.error('Error removing item:', error.response ? error.response.data : error);
        }
    };
    

    const handleQuantityChange = async (index, change) => {
        const updatedCartItems = [...cartItems];
        const currentItem = updatedCartItems[index]; // Get the current item based on the index
        const newQuantity = (currentItem.quantity || 1) + change;
    
        if (newQuantity > 0) {
            currentItem.quantity = newQuantity; // Update the quantity in the current item
            setCartItems(updatedCartItems);
    
            try {
                await axios.put(`http://localhost:7684/api/cart/${userId}/${currentItem._id}`, { quantity: newQuantity });
            } catch (error) {
                console.error('Error updating quantity:', error.response ? error.response.data : error);
            }
        }
    };
    

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="min-h-screen p-8 flex-grow py-16 px-8 mt-10">
                <div className="text-gray-900 p-6">
                    <h2 className="text-3xl font-bold mb-6">My Cart</h2>
                    {cartItems.length > 0 ? (
                        <div>
                            {cartItems.map((item, index) => (
                                <div key={item._id} className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(index)}
                                            onChange={() => handleCheckboxChange(index)}
                                            className="mr-2"
                                        />
                                        <img src={`http://localhost:7684/uploads/${item.image}`} alt={item.productName} className="w-20 h-20 object-cover rounded-md mr-4" />
                                        <div>
                                            <p>{item.productName}</p>
                                            <p>Size: {item.size}</p> {/* Display the size */}
                                            <p>Quantity: {item.quantity || 1}</p>
                                            <p>Price: ₱{item.totalPrice}</p> {/* Use totalPrice */}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                            <div className="flex justify-between font-bold">
                                <div>
                                    <p>Order Total: ₱{calculateTotal() || 0}</p>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={selectedItems.length === 0}
                                    className={`bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded ${selectedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Proceed to Checkout
                                </button>
=======
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
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
                            </div>
                        </div>
                    ) : (
                        <p>No items in the cart.</p>
                    )}
                </div>
            </div>
            <Footer />
<<<<<<< HEAD
        </div>
=======
            </div>
        </>
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
    );
};

export default Cart;
