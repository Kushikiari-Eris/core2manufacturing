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
<<<<<<< HEAD
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [addedToCart, setAddedToCart] = useState(false);
    const navigate = useNavigate();

    // Fetch product details
=======
    const [totalPrice, setTotalPrice] = useState(0); // State to track total price
    const navigate = useNavigate();

>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:7684/api/showOnlyOneProduct/${id}`);
            if (response.status === 200) {
                setProduct(response.data.product);
<<<<<<< HEAD
                // Set initial total price based on the first size or leave it at zero
                if (response.data.product.prices.length > 0) {
                    setTotalPrice(response.data.product.prices[0].price);
                }
=======
                setTotalPrice(response.data.product.price); // Set initial price based on product price
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
            } else {
                console.error('Failed to fetch product');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

<<<<<<< HEAD
    // Effect to fetch product when component mounts or id changes
=======
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
    useEffect(() => {
        fetchProduct();
    }, [id]);

<<<<<<< HEAD
    // Effect to redirect to cart when item is added
    useEffect(() => {
        if (addedToCart) {
            navigate('/market/cart');
        }
    }, [addedToCart, navigate]);

=======
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
    // Function to handle quantity change and update total price
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
<<<<<<< HEAD
            // Update total price when quantity changes
            setTotalPrice(newQuantity * (selectedSize ? getSizePrice(selectedSize) : 0));
        }
    };

    const getSizePrice = (size) => {
        const priceObject = product.prices.find((price) => price.size === size);
        return priceObject ? priceObject.price : 0;
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        // Update total price when a size is selected
        setTotalPrice(quantity * getSizePrice(size));
    };

    const handleAddToCart = async () => {
=======
            setTotalPrice(newQuantity * product.price); // Update total price
        }
    };

    const handleAddToCart = () => {
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
        const userId = Cookies.get('userId');
        if (!userId) {
            console.error("User is not logged in. Cannot add to cart.");
            return;
        }
<<<<<<< HEAD
        
        try {
            const cartItem = {
                userId,
                productId: product._id,
                productName: product.productName,
                quantity,
                totalPrice,
                image: product.image,
                size: selectedSize,
            };
    
            const response = await axios.post('http://localhost:7684/api/cart', cartItem);
    
            if (response.status === 200 || response.status === 201) {
                setAddedToCart(true);
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
=======

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
            
>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
            <main className="flex-grow py-16 px-8 mt-20">
                {product ? (
                    <div className="mx-auto container grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img src={`http://localhost:7684/uploads/${product.image}`} alt={product.productName} className="h-[36rem] object-cover rounded-md"/>
                        </div>
<<<<<<< HEAD
                        <div className="flex flex-col">
                            <p className="mb-4 font-bold text-4xl">{product.productName}</p>
                            <div className="flex items-center mb-4 text-gray-600">
                                <p className="capitalize">Category: {product.category}</p>
                            </div>
                            <div className="flex items-center mb-4 text-gray-600">
                                <p className="capitalize">Description: {product.description}</p>
                            </div>
                            <p className="text-gray-900 mb-4 font-bold text-3xl">₱{totalPrice}</p>
                            <div className="mb-4">
                                <h2 className='font-bold'>Size</h2>
                                <div className="size-selector">
                                    {product.prices.map((priceItem) => (
                                        <button
                                            key={priceItem._id}
                                            className={`size-button py-3 px-4 border rounded-md ${selectedSize === priceItem.size ? 'bg-gray-800 text-white' : 'bg-white'}`}
                                            onClick={() => handleSizeSelect(priceItem.size)}
                                        >
                                            {priceItem.size}
                                        </button>
                                    ))}
                                </div>
                            </div>
=======

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

>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
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
<<<<<<< HEAD
=======

>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
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
<<<<<<< HEAD
=======

>>>>>>> 17e54ee1d090ce19e37c289bdadfdc85dc1313cf
            <Footer />
        </div>
    );
};

export default ProductDetail;
