import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Footer from '../../components/Footer';
import image3 from '../../assets/image/image3.jpg';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'; // Import Pagination module from Swiper
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import axiosInstance from '../../utils/AxiosInstance';

const Market = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get('/showAllProduct');
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

      <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply" style={{ backgroundImage: `url(${image3})` }}>
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Welcome to JJM Soap and Detergent</h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Get started
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
            <a href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
              Learn more
            </a>
          </div>
        </div>
      </section>

      <div className="flex justify-center items-center mt-20">
        <div className="w-full max-w-7xl p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Latest Products</h2>
          
          {/* Swiper container */}
          <Swiper
            modules={[Pagination]} // Enable Pagination module
            pagination={{
              el: '.custom-pagination', // Targeting the custom pagination container
              clickable: true,
            }} 
            className="mb-8"
            breakpoints={{
              640: { slidesPerView: 1 }, // For small devices
              768: { slidesPerView: 2 }, // For medium devices
              1024: { slidesPerView: 3 }, // For large devices
            }}
          >
            {product.length > 0 ? (
              product.map((productItem) => (
                <SwiperSlide key={productItem._id}>
                  <div className="flex flex-col  bg-white p-4 h-[500px] border mx-3 rounded-lg">
                    <Link to={`/market/productDetail/${productItem._id}`}>
                      <img className="w-full h-64 object-cover rounded-md mb-4" src={`http://localhost:7684/uploads/${productItem.image}`} alt={productItem.productName} />
                    </Link>
                    <span className="text-sm font-semibold font-sans capitalize  text-gray-500 ">{productItem.category}</span>
                    <Link to={`/market/productDetail/${productItem._id}`}>
                      <h5 className="text-xl font-sans font-bold tracking-tight text-gray-900 dark:text-white my-2">{productItem.productName}</h5>
                    </Link>
                    <p className="text-sm font-sans text-gray-700 dark:text-gray-400 line-clamp-5 overflow-hidden my-2">{productItem.description}</p> {/* Limit description to 2 lines */}
                    <div className="flex flex-col mt-auto ">
                      <span className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">₱{productItem.price}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>No products available</p>
            )}
          </Swiper>

          {/* Custom Pagination container (placed outside the Swiper) */}
          <div className="custom-pagination flex justify-center mt-6"></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Market;
