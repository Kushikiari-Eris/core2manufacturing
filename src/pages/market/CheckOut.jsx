import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

const CheckOut = () => {
    const location = useLocation();
    const { cartItems = [], total = 0 } = location.state || {};
    const navigate = useNavigate();
    const userId = Cookies.get('userId');

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactNumber: '',
        paymentMethod: 'gcash',
        shippingLocation: '',
    });

    const [shippingFee, setShippingFee] = useState(0);
    const [currentCartItems, setCurrentCartItems] = useState(cartItems);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!currentCartItems || currentCartItems.length === 0) {
            navigate('/market/cart');
        }
    }, [currentCartItems, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'shippingLocation') {
            const fee = getShippingFee(value);
            setShippingFee(fee);
        }
    };

    const getShippingFee = (location) => {
        switch (location) {
            case 'Central Luzon':
            case 'Province of Bulacan':
            case 'Caloocan':
                return 80;
            case 'Malolos':
            case 'Apalit':
            case 'San Miguel':
                return 180;
            case 'Tarlac':
            case 'Bataan':
            case 'San Fernando':
                return 380;
            default:
                return 0;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentCartItems.length === 0) {
            setError('You cannot confirm your order with no items in the cart.');
            return;
        }
    
        const newOrder = {
            userId,
            name: formData.name,
            address: formData.address,
            contactNumber: formData.contactNumber,
            paymentMethod: formData.paymentMethod,
            shippingLocation: formData.shippingLocation,
            items: currentCartItems.map(item => ({
                productName: item.productName,
                price: item.totalPrice, // Still useful for order details
                productQuantity: item.quantity || 1,
                size: item.size,
                image: item.image,
            })),
            totalAmount: total + shippingFee,
            shippingFee,
            date: new Date().toISOString(),
        };
    
        try {
            // Create the order
            const response = await axios.post('http://localhost:7684/api/orders', newOrder, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 201) {
                // Decrement stock for each item in the order
                await Promise.all(currentCartItems.map(async item => {
                    const stockUpdatePayload = {
                        size: item.size,
                        quantity: item.quantity || 1, // Always ensure this is defined
                    };
                    
                    console.log('Updating stock for:', item._id, stockUpdatePayload); // Log the details
                    
                    try {
                        const response = await axios.put(`http://localhost:7684/api/finishGoods/${item._id}`, stockUpdatePayload);
                        console.log('Stock update response:', response.data); // Log response from server
                    } catch (updateError) {
                        console.error('Error updating stock:', updateError.response?.data || updateError);
                    }
                }));
    
                // Remove items from the cart in the database
                await Promise.all(currentCartItems.map(item =>
                    axios.delete(`http://localhost:7684/api/cart/${userId}/${item._id}`)
                ));
    
                Swal.fire({
                    title: 'Purchase Successfully!',
                    text: 'Thank you for your purchase.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
    
                navigate('/market/allproducts');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            const errorMessage = error.response?.data?.message || 'There was an error submitting your order. Please try again.';
            setError(errorMessage);
        }
    };
    
    
    
    

    
    

    return (
        <div className="min-h-screen p-8">
            <div className='grid grid-cols-2 gap-4 px-40'>
                <div className='border border-gray-500 p-6 rounded  h-[550px] overflow-y-auto'>
                    <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 ">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <select
                                name="shippingLocation"
                                value={formData.shippingLocation}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            >
                                <option value="">Select Location</option>
                                <option value="Central Luzon">Central Luzon</option>
                                <option value="Province of Bulacan">Province of Bulacan</option>
                                <option value="Caloocan">Caloocan</option>
                                <option value="Malolos">Malolos</option>
                                <option value="Apalit">Apalit</option>
                                <option value="San Miguel">San Miguel</option>
                                <option value="Tarlac">Tarlac</option>
                                <option value="Bataan">Bataan</option>
                                <option value="San Fernando">San Fernando</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                                required
                            >
                                <option value="gcash">GCash</option>
                                <option value="cod">Cash on Delivery</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                        >
                            Place Order
                        </button>
                    </form>
                </div>
                <div>
                    <div className="text-gray-900 p-6 border border-gray-500 rounded">
                        <h2 className="text-3xl font-bold mb-6">Your Order</h2>
                        {currentCartItems.length > 0 ? (
                            <div>
                                {currentCartItems.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center mb-4">
                                        <div className="flex items-center">
                                            <img src={`http://localhost:7684/uploads/${item.image}`} alt={item.productName} className="w-20 h-20 object-cover rounded-md mr-4" />
                                            <div>
                                                <p>{item.productName}</p>
                                                <p>Size: {item.size}</p> {/* Display size */}
                                                <p>Quantity: {item.quantity || 1}</p>
                                                <p>Price: ₱{item.totalPrice * (item.quantity || 1)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <hr className="h-px my-8 bg-gray-500 border-0 dark:bg-gray-700" />
                                <div className="flex justify-between font-bold">
                                    <div className="font-bold text-lg">
                                        Shipping Fee: ₱{shippingFee}<br />
                                        Subtotal: {total}<br/>
                                        Total: ₱{total + shippingFee}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No items in the cart.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
