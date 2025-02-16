import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
}, []);

const fetchProducts = async () => {
    try {
        
        const response = await axios.get('http://localhost:7684/api/finishGoods');
        // Check if the response data is an array
        if (Array.isArray(response.data)) {
            setProducts(response.data); 
        } else {
            console.warn("Products not in expected format", response.data);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <div className="flex-grow flex justify-center items-center mt-20">
          <div className="w-full max-w-7xl p-4">
            <div className="flex justify-between mb-3 items-center">
              <h2 className="text-2xl font-bold mb-4 text-center ml-5">All Products</h2>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {products.length > 0 ? (
                products.map((productItem) => (
                  <div
                    key={productItem._id}
                    className="flex flex-col bg-white p-4 h-[500px] border mx-3 rounded-lg"
                  >
                    <Link to={`/market/productDetail/${productItem._id}`}>
                      <img
                        className="w-full h-64 object-cover rounded-md mb-4"
                        src={`http://localhost:7684/uploads/${productItem.image}`}
                        alt={productItem.productName}
                      />
                    </Link>
                    <span className="text-sm font-semibold font-sans capitalize text-gray-500">
                      {productItem.category}
                    </span>
                    <Link to={`/market/productDetail/${productItem._id}`}>
                      <h5 className="text-xl font-sans font-bold tracking-tight text-gray-900 dark:text-white my-2">
                        {productItem.productName}
                      </h5>
                    </Link>
                    <div className="flex flex-col">
                      {productItem.unitPrize.map((priceItem) => (
                        <span key={priceItem._id} className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">
                          {priceItem.size}: ₱{priceItem.price}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer stays at the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default AllProducts;
