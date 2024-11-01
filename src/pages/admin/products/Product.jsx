import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    const [products, setProducts] = useState([]); // State for products
    const [loading, setLoading] = useState(true); // State for loading
    
    //Pagination
    const itemsPerPage = 2; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Slice the products array for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

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
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:7684/api/finishGoods');
            
            // Check if the response data is an array
            if (Array.isArray(response.data)) {
                setProducts(response.data); // Directly set the products from response.data
                console.log("Products set:", response.data);
            } else {
                console.warn("Products not in expected format", response.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch products.");
        } finally {
            setLoading(false);
        }
    };

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
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                    </svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-gray-900">Product Execution</a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Product Launcher</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-gray-900">Product Launcher</h2>
                        
                    {/* Search Bar and Add Product Button */}
                    <div className="relative  sm:rounded-lg flex items-center">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                            <input type="text" id="table-search" className=" block pt-4 ps-10 pb-4 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
                    </div>

                    {/* Products Table */}
                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-500 dark:text-gray-400">
                                <tr>
                                <th scope="col" className="px-6 py-3"> Product Image</th>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Size/Price
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentProducts && currentProducts.length > 0 ? (
                                    currentProducts.map((prod) => (
                                        <tr key={prod._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">
                                                <img 
                                                    src={`http://localhost:7684/uploads${typeof prod.image === 'string' && prod.image.startsWith('/') ? '' : '/'}${prod.image}`} 
                                                    alt='' 
                                                    className="w-[100px] h-auto max-w-none object-cover rounded "/>
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {prod.productName}
                                            </th>
                                            <td className="px-6 py-4">{prod.description}</td>
                                            <td className="px-6 py-4">{prod.category}</td>
                                            <td className="px-6 py-4">
                                                {prod.unitPrize && prod.unitPrize.length > 0 ? (
                                                    prod.unitPrize.map((priceObj) => (
                                                        <p key={priceObj._id}> 
                                                            {priceObj.size}: {priceObj.price}
                                                        </p>
                                                    ))
                                                ) : (
                                                    <p>N/A</p>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center">No products available.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                            {/* Pagination Controls */}
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
                    )}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Product;
