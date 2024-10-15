import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0); // State to track total price
    const navigate = useNavigate();

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:7684/api/showOnlyOneProduct/${id}`);
            if (response.status === 200) {
                setProduct(response.data.product);
                setTotalPrice(response.data.product.price); // Set initial price based on product price
            } else {
                console.error('Failed to fetch product');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // Function to handle quantity change and update total price
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            setTotalPrice(newQuantity * product.price); // Update total price
        }
    };

    const handleAddToCart = () => {
        const userId = Cookies.get('userId');
        if (!userId) {
            console.error("User is not logged in. Cannot add to cart.");
            return;
        }

        const cartKey = `cart_${userId}`;
        let cartItems = localStorage.getItem(cartKey) ? JSON.parse(localStorage.getItem(cartKey)) : [];

        // Add product with selected quantity to the cart
        cartItems.push({
            ...product,
            quantity, // Add selected quantity to the product data
            totalPrice, // Add total price
        });

        localStorage.setItem(cartKey, JSON.stringify(cartItems));
        navigate('/market/cart');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow py-16 px-8 mt-20">
                {product ? (
                    <div className="mx-auto container grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img src={`http://localhost:7684/uploads/${product.image}`} alt={product.productName} className="h-[36rem] object-cover rounded-md"/>
                        </div>

                        <div className="flex flex-col">
                            <p className="mb-4 font-bold text-4xl">
                                {product.productName}
                            </p>
                            <div className="flex items-center mb-4 text-gray-400">
                                <p className="capitalize ">Category: {product.category}</p>
                            </div>
                            <div className="flex items-center mb-4 text-gray-400">
                                <p className="capitalize ">Description: {product.description}</p>
                            </div>
                            {/* Display total price based on quantity */}
                            <p className="text-gray-900 mb-4 font-bold text-3xl">
                                ₱{totalPrice} {/* Updated total price */}
                            </p>

                            <div className="mb-4">
                                <p className='font-bold'>Quantity</p>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => handleQuantityChange(quantity > 1 ? quantity - 1 : 1)}
                                        className="px-4 py-2 border bg-gray-200"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 border bg-white">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        className="px-4 py-2 border bg-gray-200"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="my-8">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading product details...</p>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;
