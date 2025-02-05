"use client";

import { useState, useEffect } from "react";
import "./style.css";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../../features/cartApi";

function CardItems() {
  const { data, isLoading } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [cartItems, setCartItems] = useState([]);

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
          publicId: item.stockId.publicId, // Ensure this is available
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

  const getWatermarkedUrl = (originalUrl, publicId, isVideo) => {
    const watermarkPublicId =
      "WhatsApp_Image_2024-10-16_at_04.04.20_d9ef112c-removebg_zuon1c.png";

    if (!publicId) return originalUrl; // If no publicId, return the original URL

    if (isVideo) {
      return `https://res.cloudinary.com/dhqioo6t0/video/upload/l_${watermarkPublicId},w_200,g_south_east,x_10,y_10/v1/${publicId}.mp4`;
    } else {
      return `https://res.cloudinary.com/dhqioo6t0/image/upload/w_500,h_500,c_limit,fl_relative,g_south_east,x_10,y_10,l_${watermarkPublicId}/v1/${publicId}`;
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

        <div className="row md-marg">
          {isLoading ? (
            <div className="col-12 text-center">
              <h4>Loading...</h4>
            </div>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
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
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CardItems;
