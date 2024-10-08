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

    <div
    className="hero min-h-screen"
    style={{
        backgroundImage: `url(${image3})`,
    }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
            <div className="">
            <h1 className="mb-5 text-8xl font-bold">JJM Soap And Detergent</h1>
            <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
    </div>

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