import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Navbar from '../../components/Navbar'
import image1 from '../../assets/image/image1.jpg'
import Footer from '../../components/Footer'

const ProductDetail = () => {

    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()


    const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:7684/product/showOnlyOneProduct/${id}`)
          if (response.status === 200) {
            setProduct(response.data.product)
          } else {
            console.error('Failed to fetch product')
          }
        } catch (error) {
          console.error('Error fetching product:', error)
        }
      }
    
      useEffect(() => {
        fetchProduct()
      }, [id])


     // Handle "Add to Cart" button click using cookies
     const handleAddToCart = () => {
        const userId = Cookies.get('userId'); // Get the userId from cookies
        if (!userId) {
            console.error("User is not logged in. Cannot add to cart.");
            return;
        }

        // Use userId to create a unique cart key
        const cartKey = `cart_${userId}`;

        // Get the existing cart from local storage (if it exists)
        let cartItems = localStorage.getItem(cartKey) ? JSON.parse(localStorage.getItem(cartKey)) : [];

        // Add the new product to the cart
        cartItems.push(product);

        // Save the updated cart in local storage
        localStorage.setItem(cartKey, JSON.stringify(cartItems));

        // Navigate to the cart page
        navigate('/market/cart');
    };

  return (
    <>
    <Navbar/>

    <div className="flex justify-center items-center min-h-screen">
        <div role="status" className="space-y-8  md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <img src={image1} alt="" />
            </div>
            
            <div className="w-full">
            {product ? (
                <div className="w-80">
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{product.productName}</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-400">{product.description}</p>
                <p className="mt-4 text-xl font-bold text-gray-900 dark:text-white">₱{product.price}</p>

                {/* Add to Cart button */}
                <button className="mt-4 btn btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>

                </div>
            ) : (
                <p>Loading product details...</p>
              )}
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    </div>


    <Footer/>
    </>
  )
}

export default ProductDetail