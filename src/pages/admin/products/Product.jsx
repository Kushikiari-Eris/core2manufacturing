import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Product = () => {

    const [product, setProduct] = useState([]);
    const [createProduct, setCreateProduct] = useState({
        productName: '',
        description: '',
        category: '',
        price: 0,
    });
    const [editProduct, setEditProduct] = useState(null); // Track the product being edited

    const createProductForm = async (e) => {
        e.preventDefault();

        const category = document.getElementById('category').value;

        if (!['soap', 'detergent'].includes(category)) {
            toast.error('Invalid category selected.')
            return;
        }

        try {
            if (editProduct) {
                // If editProduct exists, update the product
                await axios.put(`http://localhost:7684/product/updateProduct/${editProduct._id}`, {
                    ...createProduct,
                    category: category.toLowerCase(),
                })

                // Update the product list
                setProduct((prevProducts) =>
                    prevProducts.map((prod) =>
                        prod._id === editProduct._id ? { ...prod, ...createProduct } : prod
                    )
                );

                toast.success('Product updated successfully!')
            } else {
                // Create new product
                const res = await axios.post('http://localhost:7684/product/create', {
                    ...createProduct,
                    category: category.toLowerCase(),
                })

                // Append the new product to the existing list
                setProduct((prevProducts) => [res.data.product, ...prevProducts])

                toast.success('Product added successfully!')
            }

            // Reset form fields and editProduct
            setCreateProduct({
                productName: '',
                description: '',
                category: '',
                price: 0,
            });
            setEditProduct(null);

            // Close the modal
            document.getElementById('my_modal_1').close();
        } catch (error) {
            console.error('Error creating/updating product:', error);
            toast.error('Failed to create/update product. Please try again.')
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await axios.get('http://localhost:7684/product/showAllProduct');
            if (response.status === 200) {
                setProduct(response.data.products)
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEditProduct = (prod) => {
        // Fill form with product data
        setCreateProduct({
            productName: prod.productName,
            description: prod.description,
            category: prod.category,
            price: prod.price,
        });
        setEditProduct(prod); // Set the product to be edited
        document.getElementById('my_modal_1').showModal() // Open modal
    };

    const handleDeleteProduct = async (prodId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:7684/product/deleteProduct/${prodId}`);
            
            // Remove the deleted product from the state
            setProduct((prevProducts) => prevProducts.filter((prod) => prod._id !== prodId));

            toast.success('Product deleted successfully!')
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product. Please try again.')
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);
    
    



  return (
    <>
    
        <div className="p-4 sm:ml-64 bg-gray-100 h-screen">
        <div className="p-4   rounded-lg dark:border-gray-700 mt-20">
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
                    <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-gray-900">E-Commerce</a>
                </div>
                </li>
                <li aria-current="page">
                <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Products</span>
                </div>
                </li>
            </ol>
            </nav>
            <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-gray-900">All Products</h2>
            

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex items-center justify-between">
                    <div className="relative flex-grow">
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="text" id="table-search" className="flex block pt-4 ps-10 pb-4 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
                        </div>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"  onClick={() => {
                                setEditProduct(null); // Clear any existing edit product
                                setCreateProduct({
                                    productName: '',
                                    description: '',
                                    category: '',
                                    price: 0,
                                });
                                document.getElementById('my_modal_1').showModal();
                            }}>Add new</button>
                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg mb-5">{editProduct ? 'Edit Product' : 'Add new product'}</h3>
                                    <form className="max-w-sm mx-auto" onSubmit={createProductForm}>
                                        <div className="mb-5">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                            <input type="text" id="productName" value={createProduct.productName} onChange={(e) => setCreateProduct({ ...createProduct, productName: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Name" required />
                                        </div>
                                        <div className="mb-5">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                            <textarea rows="4" value={createProduct.description} onChange={(e) => setCreateProduct({ ...createProduct, description: e.target.value })} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Description"></textarea>
                                        </div>
                                        <div className="mb-5">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                                            <select id="category" value={createProduct.category} onChange={(e) => setCreateProduct({ ...createProduct, category: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="soap">Soap</option>
                                                <option value="detergent">Detergent</option>
                                            </select>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price:</label>
                                            <input  type="number" id="number-input" value={createProduct.price || ""}  onChange={(e) => setCreateProduct({ ...createProduct, price: parseFloat(e.target.value) || 0 })}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" required />
                                        </div>
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{editProduct ? 'Update' : 'Add'}</button>
                                        <button type="button" onClick={() => document.getElementById('my_modal_1').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                </div>
                            </dialog>

                        
                    </div>
                    
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-500 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                   
                                </th>
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
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {product && product.length > 0 ? (
                                product.map((prod) => (
                                    <tr key={prod._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id={`checkbox-${prod._id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor={`checkbox-${prod._id}`} className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {prod.productName}
                                        </th>
                                        <td className="px-6 py-4">{prod.description}</td>
                                        <td className="px-6 py-4">{prod.category}</td>
                                        <td className="px-6 py-4">{prod.price}</td>
                                        <td className="px-6 py-4">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4" onClick={() => handleEditProduct(prod)}>Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline"  onClick={() => handleDeleteProduct(prod._id)}>Delete</a>
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
                </div>
        </div>
        <ToastContainer />  {/* Add Toast Container */}
        
    </>
  )
}

export default Product