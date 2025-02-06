"use client";

import React, { useState, useEffect } from "react";
import "./style.css";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../../features/cartApi";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

function CardItems() {
  const { data, isLoading } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [cartItems, setCartItems] = useState([]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
          publicId: item.stockId.publicId,
        }))
      );
    }
  }, [data]);

  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51Qp3MIC1NDqhDk4ultyR7SMLLRSve1QTkDfO4FBnDkcVNtYyNaXvynzWhzJ0aB2uYg1gkBnX61vSEILCPzBYz6QF00m6mGcGfY"
      );

      if (!data?.cart || data.cart.length === 0) {
        console.error("Cart is empty or data.cart is undefined.");
        return;
      }

      const res = await axios.post(
        `${BACKEND_URL}/api/cart/create-payment`,
        {
          products: cartItems,
        },
        { withCredentials: true }
      );

      if (res.data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
        toast.success("Payment Successfull",{position:'top-center'});
      } else {
        console.error("Stripe session ID not received.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const removeItem = async (id) => {
    await removeFromCart(id);
    toast.success("Removed from the cart");
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  const getWatermarkedUrl = (originalUrl, publicId, isVideo) => {
    const watermarkPublicId = "SM_Symbol_v9fqhu.png";

    if (!publicId) return originalUrl;

    if (isVideo) {
      return `https://res.cloudinary.com/ddyg4op2x/video/upload/l_${watermarkPublicId},w_200,g_south_east,x_10,y_10/v1/${publicId}.mp4`;
    } else {
      return `https://res.cloudinary.com/ddyg4op2x/image/upload/w_500,h_500,c_limit,fl_relative,g_south_east,x_10,y_10,l_${watermarkPublicId}/v1/${publicId}`;
    }
  };

  const isVideo = (url) => {
    return url?.match(/\.(mp4|webm|ogg)$/i);
  };

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

        {isLoading ? (
          <div className="col-12 text-center">
            <h4>Loading...</h4>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="row md-marg">
            {cartItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 items">
                <div className="item mb-50">
                  <div className="img">
                    {/* Check if the image is a video */}
                    {isVideo(item.image) ? (
                      <video
                        src={
                          item.price > 0
                            ? getWatermarkedUrl(item.image, item.publicId, true)
                            : item.image
                        }
                        style={{ pointerEvents: "none" }}
                        autoPlay
                        loop
                        muted
                        width="100%"
                        height="auto"
                      ></video>
                    ) : (
                      <img
                        src={
                          item.price > 0
                            ? getWatermarkedUrl(
                                item.image,
                                item.publicId,
                                false
                              )
                            : item.image
                        }
                        style={{ pointerEvents: "none" }}
                        alt={item.title}
                      />
                    )}
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
            ))}
          </div>
        ) : (
          <div className="col-12 text-center">
            <h4>Your cart is empty!</h4>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="cart-footer shadow-lg">
            <h5>
              Total Items:{" "}
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
