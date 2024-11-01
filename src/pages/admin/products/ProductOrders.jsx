import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Step,
    Card,
    Stepper,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTruck, faGift } from '@fortawesome/free-solid-svg-icons';

  

const ProductOrders = () => {

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // Hold selected order for modal
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [activeStep, setActiveStep] = React.useState(0);

    //Pagination
  
      const itemsPerPage = 5; // Number of items per page
      const [currentPage, setCurrentPage] = useState(1);

      // Calculate the total number of pages
      const totalPages = Math.ceil(orders.length / itemsPerPage);

      // Slice the products array for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentProducts = orders.slice(startIndex, startIndex + itemsPerPage);

      //Pageination
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

    useEffect(() => {
        const fetchOrders = async () => {
          setLoading(true); // Start loading before fetch
          try {
            const response = await axios.get('http://localhost:7684/api/showAllOrders');
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
                    <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-gray-900">Customer Orders</h2>


                    <div className="relative flex-grow">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search" className="flex  pt-4 ps-10 pb-4 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
                    </div>
                    {/* Orders Table */}
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-500 dark:text-gray-400">
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
                                    currentProducts.map((order, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {order._id}
                                            </th>
                                            <td className="px-6 py-4">{order.customerName}</td>
                                            <td className="px-6 py-4">₱{order.totalAmount}</td>
                                            <td className="px-6 py-4">{order.paymentMethod}</td>
                                            <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <button className="text-blue-600 hover:text-blue-300 dark:text-blue-500 dark:hover:text-blue-400 mr-2" onClick={() => openModal(order)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                  </svg>
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
                        {totalPages > 1 && (
                          <nav className="flex px-6 py-2 justify-center items-center gap-x-1 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" aria-label="Pagination">
                            <button type="button" onClick={handlePreviousPage} disabled={currentPage === 1} className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Previous">
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6"></path>
                              </svg>
                              <span aria-hidden="true" className="hidden sm:block">Previous</span>
                            </button>
                            
                            <div className="flex items-center gap-x-1">
                              {/* Display Previous Page */}
                              <button type="button" className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${currentPage === 1 ? 'bg-gray-400' : 'bg-gray-200'} text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white dark:focus:bg-neutral-500`} disabled>
                                {currentPage > 1 ? currentPage - 1 : 1}
                              </button>
                              {/* Display Next Page */}
                              <button type="button" className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${currentPage < totalPages ? 'bg-gray-200' : 'bg-gray-400'} text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white dark:focus:bg-neutral-500`} disabled>
                                {currentPage < totalPages ? currentPage + 1 : totalPages}
                              </button>
                            </div>
                            
                            <button type="button" onClick={handleNextPage} disabled={currentPage === totalPages} className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                              <span aria-hidden="true" className="hidden sm:block">Next</span>
                              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6"></path>
                              </svg>
                            </button>
                          </nav>
                          )}
                    </div>

                    {/* Modal for Order Details and Shipment Progress */}
                    <dialog id="shipment_modal" className="modal">

                    {selectedOrder && (
                         <section className=" container mx-auto py-10 px-8 border bg-white max-h-[90vh] overflow-auto rounded relative">
                      <form method="dialog">
                                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                              </form>
                      <Typography variant="h4">Order Details</Typography>
                        <Typography className="text-gray-600 font-normal">
                          Order placed on <span className="font-bold">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                        </Typography>
                          <div className="mt-8 grid lg:gap-x-6 gap-y-6 lg:grid-cols-12 grid-cols-6">
                          
                            <div className="col-span-8 space-y-6">
                              
                              <Card className="border border-gray-300 !rounded-md shadow-sm mb-10">
                                <CardBody className="p-4 flex gap-4 flex-col md:flex-row items-center justify-between">
                                  <div className="flex !justify-between w-full">
                                    <div>
                                      <Typography color="blue-gray" className="!font-semibold">
                                        Date Ordered
                                      </Typography>
                                      <Typography className="text-gray-600 font-normal">
                                      {new Date(selectedOrder.orderDate).toLocaleDateString()}
                                      </Typography>
                                    </div>
                                    <div>
                                      <Typography color="blue-gray" className="!font-semibold">
                                        Order Id
                                      </Typography>
                                      <Typography className="text-gray-600 font-normal">
                                      # {selectedOrder._id}
                                      </Typography>
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                              <Card className="border border-gray-300 !rounded-md shadow-sm">
                                <CardHeader
                                  shadow={false}
                                  className="md:h-40 h-32 rounded-none border-b border-gray-300"
                                >
                                  <Stepper
                                    activeStep={activeStep}
                                    lineClassName="bg-gray-300"
                                    activeLineClassName="bg-green-400"
                                  >
                                    <Step
                                      className="fas fa-check-circle !rounded-md !bg-green-400 !text-white"
                                      activeClassName="bg-blue-gray-500 text-white"
                                      completedClassName="!blue-900 text-white"
                                      onClick={() => setActiveStep(0)}
                                    >
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
                                      <div className="absolute md:pl-32 pl-6 md:-bottom-[4.5rem] -bottom-[3rem] w-max items-center">
                                        <Typography variant="h6" color="blue-gray">
                                          To Ship
                                        </Typography>
                                        <Typography className="font-normal text-gray-600 md:block hidden">
                                          10:00 PM April 1, 2024
                                        </Typography>
                                      </div>
                                    </Step>
                                    <Step
                                      className="fas fa-truck !rounded-md !border border-gray-300 text-gray-900 !bg-white"
                                      activeClassName="!bg-green-400 !text-white"
                                      completedClassName="!bg-green-400 !text-white"
                                      onClick={() => setActiveStep(1)}
                                    >
                                        <FontAwesomeIcon icon={faTruck} className="text-xl" />
                                      <div className="absolute  md:-bottom-[4.5rem] -bottom-[3rem] w-max text-center">
                                        <Typography variant="h6" color="blue-gray">
                                          To Deliver
                                        </Typography>
                                        <Typography className="font-normal text-gray-600 md:block hidden">
                                          10:00 PM April 3, 2024
                                        </Typography>
                                      </div>
                                    </Step>
                                    <Step
                                      className="fas fa-gift !rounded-md !border border-gray-300 text-gray-900 !bg-white"
                                      activeClassName="!bg-green-400 text-white"
                                      completedClassName="!bg-green-400 text-white"
                                      onClick={() => setActiveStep(2)}
                                    >
                                        <FontAwesomeIcon icon={faGift} className="text-xl" />
                                      <div className="absolute md:-bottom-[4.5rem] -bottom-[3rem] w-max text-right md:pr-44 pr-5">
                                        <Typography variant="h6" color="blue-gray">
                                          Completed
                                        </Typography>
                                        <Typography className="font-normal text-gray-600 md:block hidden">
                                          Estimated date: April 9, 2024
                                        </Typography>
                                      </div>
                                    </Step>
                                  </Stepper>
                                </CardHeader>
                                <CardBody className="md:px-2 pb-14">
                                  {selectedOrder.items.map((item, index) => (
                                      <div key={index} className="grid grid-cols-5 items-center gap-1 mb-2 ml-3">
                                          <img
                                              src={`http://localhost:7684/uploads/${item.image}`}
                                              className=" w-40 h-40 object-cover rounded row-span-1"
                                          />
                                          <div className="col-span-3 ml-3">
                                              <Typography variant="h6" color="blue-gray" className="text-base mb-1">
                                                  {item.productName}
                                              </Typography>
                                              <Typography className="font-normal text-gray-600 mb-0.5">
                                                  Size: {item.size}
                                              </Typography>
                                              <Typography className="font-normal text-gray-600 mb-0.5">
                                                  Quantity: {item.productQuantity}
                                              </Typography>
                                              <Typography className="font-normal text-gray-600 mb-0.5">
                                                  Price: ₱{item.price * item.productQuantity}
                                              </Typography>
                                          </div>
                                      </div>
                                  ))}
                            
                                </CardBody>
                              </Card>
                            </div>
                            <div className="lg:col-span-4 col-span-full space-y-6">
                              <Card className="border border-gray-300 !rounded-md shadow-sm">
                                <CardBody className="p-4">
                                  <Typography color="blue-gray" className="!font-semibold">
                                    Order Summary
                                  </Typography>
                                    {selectedOrder.items.map((item, index) => (
                                    <div className="my-4 space-y-2" key={index}>
                                      <div className="flex items-center justify-between" >
                                        <Typography className="text-gray-600 font-normal">
                                          {item.productName}
                                        </Typography>
                                        <Typography className="text-gray-600 font-normal">
                                          {item.price * item.productQuantity}.00
                                        </Typography>
                                        
                                      </div>
                                    </div>
                                    ))}
                                    <div className="my-4 space-y-2">
                                      <div className="flex items-center justify-between">
                                        <Typography className="text-gray-600 font-normal">
                                          Shipping Fee
                                        </Typography>
                                        <Typography className="text-gray-600 font-normal">
                                          {selectedOrder.shippingFee}.00
                                        </Typography>
                                      </div>
                                    </div>
                                  <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                                    <Typography color="blue-gray" className="!font-semibold">
                                      Order Total
                                    </Typography>
                                    <Typography color="blue-gray" className="!font-semibold">
                                      {selectedOrder.totalAmount}.00
                                    </Typography>
                                  </div>
                                </CardBody>
                              </Card>
                              <Card className="border border-gray-300 !rounded-md shadow-sm">
                                <CardBody className="p-4">
                                  <div className="flex items-center justify-between">
                                    <Typography color="blue-gray" className="!font-semibold">
                                      Shipping Address
                                    </Typography>
                                  </div>
                                  <div className="space-y-2 mt-4">
                                    <Typography className="text-gray-600 font-normal">
                                      Name: {selectedOrder.customerName}
                                    </Typography>
                                    <Typography className="text-gray-600 font-normal">
                                      City: {selectedOrder.shippingLocation}
                                    </Typography>
                                    <Typography className="text-gray-600 font-normal">
                                      Address: {selectedOrder.address}
                                    </Typography>
                                    <Typography className="text-gray-600 font-normal">
                                      Contact No.: {selectedOrder.contactNumber}
                                    </Typography>
                                  </div>
                                </CardBody>
                              </Card>
                              <button type='submit' className='bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded w-full'>
                                    Update
                              </button>
                              <button type='submit' className='bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded w-full'>
                                    Send to Finance
                              </button>
                            </div>
                          </div>
                      </section>
                        )}
                    </dialog>
                </div>
            </div>
    </>
  )
}

export default ProductOrders