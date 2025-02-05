"use client";

import { useState, useEffect } from "react";
import "./style.css";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../../features/cartApi";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function CardItems() {
  const { data, isLoading } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [cartItems, setCartItems] = useState([]);

  const handlePayment = async () => {
    console.log('payment function is running ......')
    try {
      const stripe = await loadStripe(
        "pk_test_51Qp2sLFRNVbhydxG8zAsORIhUy8ZS7nNCl9omwJQ7PJYSHmfyvqj6mIxk1ATxvT2sl9HyiEzdA60UndoF9mAejSM00ZF8DHsip"
      );

      const res = await axios.post(`http://localhost:2000/api/cart/create-payment`, data.cart);
      console.log(res)

      if (res.data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
      } else {
        console.error("Stripe session ID not received.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  useEffect(() => {
    if (data?.cart) {
      setCartItems(
        data.cart.map((item) => ({
          id: item.stockId._id,
          title: item.stockId.title,
          category: item.stockId.category,
          image: item.stockId.stockImageUrl,
          description: item.stockId.stockDescription,
          price: item.stockId.price,
        }))
      );
    }
  }, [data]);

  const removeItem = async (id) => {
    await removeFromCart(id);
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  return (
    <section className="work-grid section-padding pb-0">
      <div className="container">
        <div className="row mb-80">
          <div className="col-lg-4">
            <div className="sec-head">
              <h6 className="sub-title main-color mb-10">DISCOVER Your Cart</h6>
              <h3>Shopping Cart</h3>
            </div>
          </div>
        </div>

        <div className="row md-marg">
          {isLoading ? (
            <div className="col-12 text-center">
              <h4>Loading...</h4>
            </div>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 items">
                <div className="item mb-50">
                  <div className="card-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cont d-flex flex-column mt-20">
                    <span className="p-color mb-5 sub-title main-color">
                      {item.category}
                    </span>
                    <h6 className="mb-10">{item.title}</h6>
                    <p className="description">
                      {item.description.split(" ").slice(0, 10).join(" ")}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-15">
                      <span className="price">${item.price.toFixed(2)}</span>
                      <button
                        className="remove-btn main-colorbg"
                        style={{ width: "fit-content" }}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
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

        {cartItems.length > 0 && (
          <div className="cart-footer shadow-lg">
            <h5>
              Total Items :{" "}
              <span className="main-color">{cartItems.length}</span>
            </h5>
            <h3 className="mt-10 mb-30">
              Total: <span className="main-color">${totalPrice}</span>
            </h3>
            <button className="checkout-btn" onClick={handlePayment}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CardItems;
