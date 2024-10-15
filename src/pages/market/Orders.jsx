import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import axiosInstance from '../../utils/AxiosInstance'
import axios from 'axios'


const Orders = () => {

    const [orders, setOrders] = useState([]); // Always start with an empty array
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const userId = Cookies.get('userId'); // Get the user ID from cookies

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:7684/api/showOrdersByUser/${userId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data); // Set fetched orders
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Stop loading after fetch
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <>
        <Navbar />
            <div className="min-h-screen p-8">
                <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
                {orders.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {orders.map((order) => (
                            <div key={order._id} className="border p-4 rounded shadow-sm">
                                <h2 className="text-xl font-bold mb-2">Order #{order._id}</h2>
                                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                                <p><strong>Name:</strong> {order.customerName}</p>
                                <p><strong>Address:</strong> {order.address}</p>
                                <p><strong>Contact Number:</strong> {order.contactNumber}</p>
                                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                <div className="mt-4">
                                    <h3 className="font-bold">Items:</h3>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                {item.productName} - ₱{item.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="mt-4 font-bold">Total Amount: ₱{order.totalAmount}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You have no orders yet.</p>
                )}
            </div>
        <Footer />
    </>
  )
}

export default Orders