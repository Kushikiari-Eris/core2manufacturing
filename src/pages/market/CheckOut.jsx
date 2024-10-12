import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const CheckOut = () => {

    const location = useLocation();
    const { cartItems, total } = location.state || {}; // Get cart items and total from state
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactNumber: '',
        paymentMethod: 'gcash', // Default payment method
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = Cookies.get('userId'); // Get user ID from cookies
    
        // Create the order object to send to the backend
        const newOrder = {
            userId,
            name: formData.name,
            address: formData.address,
            contactNumber: formData.contactNumber,
            paymentMethod: formData.paymentMethod,
            items: cartItems,
            totalAmount: total,
            date: new Date().toISOString(), // Add the current date in ISO format
        };
    
        try {
            // Send the order data to the backend
            const response = await fetch('http://localhost:7684/orders/createOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit order');
            }
    
            // Optionally, get the created order from the response
            const createdOrder = await response.json();
    
            // Clear the cart after confirming the order
            localStorage.removeItem(`cart_${userId}`);
    
            // Navigate to the orders page
            navigate('/market/orders');
        } catch (error) {
            console.error('Error submitting order:', error);
            // Handle error (e.g., show error message to user)
        }
    }

  return (
    <>
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    >
                        <option value="gcash">GCash</option>
                        <option value="cod">Cash on Delivery</option>
                    </select>
                </div>
                <div className="font-bold text-lg">
                    Total: ₱{total}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                >
                    Confirm Order
                </button>
            </form>
        </div>
    </>
  )
}

export default CheckOut