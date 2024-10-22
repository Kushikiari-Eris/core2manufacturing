import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('To Ship');

    const userId = Cookies.get('userId');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:7684/api/showOrdersByUser/${userId}`);
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const tabItems = [
        { label: 'To Ship', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>},
        { label: 'To Receive', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg> },
        { label: 'Completed', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" /></svg>},
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen p-8 mt-20">

                <div className="sm:hidden">
                    <select
                        id="tabs"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => handleTabChange(e.target.value)}
                        value={activeTab}
                    >
                        {tabItems.map(({ label }) => (
                            <option key={label} value={label}>{label}</option>
                        ))}
                    </select>
                </div>

                <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex">
                    {tabItems.map(({ label, icon }) => (
                        <li className="w-full" key={label}>
                            <a
                                href="#"
                                className={`flex items-center justify-center w-full p-4 ${activeTab === label ? 'text-gray-900 bg-gray-100' : 'bg-white'} border-r border-gray-200 rounded-lg`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabChange(label);
                                }}
                                aria-current={activeTab === label ? 'page' : undefined}
                            >
                                <span className="flex items-center mr-2">
                                    {icon}
                                </span>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="p-4">
                    {activeTab === 'To Ship' && 
                        <div className='flex-grow'>
                            {orders.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {orders.map((order) => (
                                        <div key={order._id} className="border p-4 rounded shadow-sm flex items-center ">
                                            <div>
                                                {order.items.map((item, index) => (
                                                    <div key={index} className='grid grid-rows-2 grid-flow-col gap-2 mb-5'>
                                                        <img src={`http://localhost:7684/uploads/${item.image}`} alt={item.productName} className="w-20 h-20 object-cover rounded-md row-span-2" />
                                                        <div className='row-span-2'>
                                                            <p>{item.productName}</p>
                                                            <p>Size: {item.size}</p>
                                                            <p>Quantity: {item.productQuantity}</p>
                                                            <p>Price: ₱{item.price * item.productQuantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>You have no orders yet.</p>
                            )}
                        </div>}
                    {activeTab === 'To Receive' && <div>No Orders Yet.</div>}
                    {activeTab === 'Completed' && <div>No Orders Yet.</div>}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Orders;
