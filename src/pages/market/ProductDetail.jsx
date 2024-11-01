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

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:7684/api/finishGoods/${id}`);
            if (response.status === 200) {
                const productData = response.data.find((item) => item._id === id);
                if (productData) {
                    setProduct(productData);
    
                    // Set default selected size to "small" if it exists
                    const defaultSize = productData.unitPrize.find((item) => item.size.toLowerCase() === 'small');
                    if (defaultSize) {
                        setSelectedSize('small');
                        setTotalPrice(defaultSize.price); // Update the total price based on the default size
                    } else if (productData.unitPrize.length > 0) {
                        // Fallback to the first available size if "small" is not available
                        setSelectedSize(productData.unitPrize[0].size);
                        setTotalPrice(productData.unitPrize[0].price);
                    }
                } else {
                    console.error("Product not found.");
                }
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

    useEffect(() => {
        if (addedToCart) {
            navigate('/market/cart');
        }
    }, [addedToCart, navigate]);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            setTotalPrice(newQuantity * (selectedSize ? getSizePrice(selectedSize) : 0));
        }
    };

    const getSizePrice = (size) => {
        const priceObject = product?.unitPrize?.find((price) => price.size === size);
        return priceObject ? priceObject.price : 0;
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setTotalPrice(quantity * getSizePrice(size));
    };

    const handleAddToCart = async () => {
        const userId = Cookies.get('userId');
        if (!userId) {
            console.error("User is not logged in. Cannot add to cart.");
            return;
        }

        const selectedSizeStock = product?.unitPrize?.find((price) => price.size === selectedSize)?.stock || 0;
        if (selectedSizeStock < quantity) {
            console.error("Selected size is out of stock.");
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
                            <img
                                src={`http://localhost:7684/uploads/${product.image}`}
                                alt={product.productName}
                                className="h-[36rem] object-cover rounded-md"
                            />
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
                                    {product.unitPrize && product.unitPrize.length > 0 ? (
                                        product.unitPrize.map((priceItem) => (
                                            <button
                                                key={priceItem._id}
                                                className={`size-button py-3 px-4 border rounded-md ${
                                                    selectedSize === priceItem.size ? 'bg-gray-800 text-white' : 'bg-white'
                                                }`}
                                                onClick={() => handleSizeSelect(priceItem.size)}
                                            >
                                                {priceItem.size}
                                            </button>
                                        ))
                                    ) : (
                                        <p>No sizes available</p>
                                    )}
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
                                    className={`w-full py-3 ${selectedSize && product.unitPrize.find((price) => price.size === selectedSize)?.stock >= quantity ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-lg hover:bg-gray-800`}
                                    disabled={!selectedSize || (product.unitPrize.find((price) => price.size === selectedSize)?.stock < quantity)}
                                >
                                    {selectedSize && product.unitPrize.find((price) => price.size === selectedSize)?.stock >= quantity 
                                        ? 'Add to Cart' 
                                        : 'Out of Stock'}
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
