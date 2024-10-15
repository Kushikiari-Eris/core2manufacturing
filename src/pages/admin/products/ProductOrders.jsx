import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axiosInstance from '../../../utils/AxiosInstance';
import axios from 'axios';

const ProductOrders = () => {

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // Hold selected order for modal
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchOrders = async () => {
          setLoading(true); // Start loading before fetch
          try {
            const response = await axios.get('http://localhost:7684/api/showAllOrders');
            console.log('Fetched orders:', response.data); // Debugging log
            setOrders(response.data);
            setLoading(false); // Stop loading after successful fetch
          } catch (err) {
            console.error('Error fetching orders:', err); // Debugging log
            setError(err.message);
            setLoading(false); // Stop loading in case of an error
          }
        };
      
        fetchOrders();
      }, []);

    // Open modal and set selected order
    const openModal = (order) => {
        setSelectedOrder(order);
        document.getElementById('shipment_modal').showModal(); // Open modal
    };

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Error state
    }


  return (
    <>
             <div className="p-4 sm:ml-64 bg-gray-100 h-screen">
                <div className="p-4 rounded-lg dark:border-gray-700 mt-20">
                    {/* Breadcrumb Navigation */}
                    <nav className="flex mb-4" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-900">
                                    <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-gray-900">E-Commerce</a>
                                </div>
                            </li>
                            <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Orders</span>
                            </div>
                            </li>
                        </ol>
                    </nav>
                    <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-gray-900">Orders</h2>


                    <div className="relative flex-grow">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search" className="flex block pt-4 ps-10 pb-4 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
                    </div>
                    {/* Orders Table */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Order ID</th>
                                    <th scope="col" className="px-6 py-3">Customer Name</th>
                                    <th scope="col" className="px-6 py-3">Total Amount</th>
                                    <th scope="col" className="px-6 py-3">Payment Method</th>
                                    <th scope="col" className="px-6 py-3">Order Date</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {order._id}
                                            </th>
                                            <td className="px-6 py-4">{order.customerName}</td>
                                            <td className="px-6 py-4">₱{order.totalAmount}</td>
                                            <td className="px-6 py-4">{order.paymentMethod}</td>
                                            <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => openModal(order)}>
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal for Order Details and Shipment Progress */}
                    <dialog id="shipment_modal" className="modal">
                        {selectedOrder && (
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg mb-4">Order #{selectedOrder._id}</h3>
                                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                                <p><strong>Address:</strong> {selectedOrder.address}</p>
                                <p><strong>Contact Number:</strong> {selectedOrder.contactNumber}</p>
                                <p><strong>Total Amount:</strong> ₱{selectedOrder.totalAmount}</p>
                                <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                                <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>

                                {/* Shipment Status Dropdown */}
                                <div className="my-4">
                                    <label className="block font-bold mb-2">Shipment Status:</label>
                                    <select className="w-full p-2 border rounded">
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                                Processing
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                        <div
                                            style={{ width: `33%` }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </dialog>
                </div>
            </div>
    </>
  )
}

export default ProductOrders