import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import image1 from '../../assets/image/image1.jpg'
import axios from 'axios'
import Footer from '../../components/Footer'
import image3 from '../../assets/image/image3.jpg'
import { Link } from 'react-router-dom'

const Market = () => {

  const [product, setProduct] = useState([]);

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
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
    <Navbar/>

    

    <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply" style={{backgroundImage: `url(${image3})`}}>
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Welcome to JJM Soap and Detergent</h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Get started
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
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
      <div className="p-4 ">
          <div className="grid grid-cols-3 gap-4 mb-4">

              {/**product1  */}
              {product && product.length > 0 ? (
                product.map((products) => (
                    <div key={products._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link to={`/market/product/${products._id}`}>
                            <img className="w-full h-64 object-cover rounded-t-lg" src={image1} />
                        </Link>
                        <div className="px-5 pb-5">
                            <Link to={`/market/product/${products._id}`}>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{products.productName}</h5>
                            </Link>
                            <p className="text-sm text-gray-700 dark:text-gray-400">{products.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">₱{products.price}</span>
                                
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No products available</p>
            )}
          </div>
      </div>
    </div>
</div>
<Footer/>
    </>
  )
}

export default Market