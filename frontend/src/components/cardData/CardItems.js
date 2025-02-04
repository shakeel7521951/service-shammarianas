'use client';

import { useState } from 'react';
import './style.css';

function CardItems() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Figma Digital Agency",
      category: "Web Design",
      image: "/assets/imgs/works/2/1.jpg",
      description: "A modern Figma-based digital agency template with responsive design and interactive elements.",
      price: 49.99 // Updated from "$49.99" to number format
    },
    {
      id: 2,
      title: "Marketing Strategy",
      category: "Marketing",
      image: "/assets/imgs/works/2/2.jpg",
      description: "Comprehensive marketing strategies to boost your business growth and online presence.",
      price: 59.99
    },
    {
      id: 3,
      title: "Web Development Kit",
      category: "Development",
      image: "/assets/imgs/works/2/3.jpg",
      description: "Complete web development toolkit including React, Node.js, and MongoDB setup.",
      price: 79.99
    }
  ]);

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <section className="work-grid section-padding pb-0">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-80">
          <div className="col-lg-4">
            <div className="sec-head">
              <h6 className="sub-title main-color mb-10">DISCOVER Your Cart</h6>
              <h3>Shopping Cart</h3>
            </div>
          </div>
        </div>

        {/* Cart Items Grid */}
        <div className="row md-marg">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 items">
                <div className="item mb-50">
                  {/* Item Image */}
                  <div className="card-img">
                    <img src={item.image} alt={item.title} />
                  </div>

                  {/* Item Details */}
                  <div className="cont d-flex flex-column mt-20">
                    <span className="p-color mb-5 sub-title main-color">{item.category}</span>
                    <h6 className="mb-10">{item.title}</h6>
                    <p className="description">{item.description.split(' ').slice(0,10).join(' ')}...</p>
                    <div className="d-flex justify-content-between align-items-center mt-15">
                      <span className="price">${item.price.toFixed(2)}</span>
                      <button className="remove-btn main-colorbg" style={{width:"fit-content"}} onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h4>Your cart is empty!</h4>
            </div>
          )}
        </div>

        {/* Cart Footer (Total Price & Checkout) */}
        {cartItems.length > 0 && (
          <div className="cart-footer shadow-lg">
            <h5>Total Items : <span className='main-color'>{cartItems.length}</span></h5>
            <h3 className='mt-10 mb-30'>Total: <span className="main-color">${totalPrice}</span></h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CardItems;
