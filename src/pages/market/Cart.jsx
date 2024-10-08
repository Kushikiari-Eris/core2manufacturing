import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const userId = Cookies.get('userId'); // Get the userId from cookies

    useEffect(() => {
        if (userId) {
            const cartKey = `cart_${userId}`; // Use the user-specific cart key
            const items = localStorage.getItem(cartKey) ? JSON.parse(localStorage.getItem(cartKey)) : [];
            setCartItems(items);
        }
    }, [userId]);


  return (
    <>
    <Navbar />
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 mb-4">
                <div>
                  <h4 className="text-xl font-bold">{item.productName}</h4>
                  <p>{item.description}</p>
                  <p className="font-bold">₱{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Cart