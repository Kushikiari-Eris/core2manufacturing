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
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [addedToCart, setAddedToCart] = useState(false);
    const navigate = useNavigate();

    // Fetch product details
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:7684/api/showOnlyOneProduct/${id}`);
            if (response.status === 200) {
                setProduct(response.data.product);
                // Set initial total price based on the first size or leave it at zero
                if (response.data.product.prices.length > 0) {
                    setTotalPrice(response.data.product.prices[0].price);
                }
            } else {
                console.error('Failed to fetch product');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    // Effect to fetch product when component mounts or id changes
    useEffect(() => {
        fetchProduct();
    }, [id]);

    // Effect to redirect to cart when item is added
    useEffect(() => {
        if (addedToCart) {
            navigate('/market/cart');
        }
    }, [addedToCart, navigate]);

    // Function to handle quantity change and update total price
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
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
        const userId = Cookies.get('userId');
        if (!userId) {
            console.error("User is not logged in. Cannot add to cart.");
            return;
        }
        
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
            <main className="flex-grow py-16 px-8 mt-20">
                {product ? (
                    <div className="mx-auto container grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img src={`http://localhost:7684/uploads/${product.image}`} alt={product.productName} className="h-[36rem] object-cover rounded-md"/>
                        </div>
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
