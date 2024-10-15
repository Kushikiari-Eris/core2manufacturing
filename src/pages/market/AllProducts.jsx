import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProducts = () => {

    const [product, setProduct] = useState([]);

    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://localhost:7684/api/showAllProduct');
        if (response.status === 200) {
          setProduct(response.data.products);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    useEffect(() => {
      fetchProduct();
    }, []);
  

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-20">
        <div className="w-full max-w-7xl p-4">
          <div className='flex justify-between mb-3 items-center'>
            <h2 className="text-2xl font-bold mb-4 text-center ml-5">All Products</h2>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {product.length > 0 ? (
              product.map((productItem) => (
                <div key={productItem._id} className="flex flex-col bg-white p-4 h-[500px] border mx-3 rounded-lg">
                  <Link to={`/market/productDetail/${productItem._id}`}>
                    <img className="w-full h-64 object-cover rounded-md mb-4" src={`http://localhost:7684/uploads/${productItem.image}`} alt={productItem.productName} />
                  </Link>
                  <span className="text-sm font-semibold font-sans capitalize text-gray-500">{productItem.category}</span>
                  <Link to={`/market/productDetail/${productItem._id}`}>
                    <h5 className="text-xl font-sans font-bold tracking-tight text-gray-900 dark:text-white my-2">{productItem.productName}</h5>
                  </Link>
                  <p className="text-sm font-sans text-gray-700 dark:text-gray-400 line-clamp-5 overflow-hidden my-2">{productItem.description}</p>
                  <div className="flex flex-col mt-auto">
                    <span className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">₱{productItem.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default AllProducts;
