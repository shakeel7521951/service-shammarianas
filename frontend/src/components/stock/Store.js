"use client";

import { useAddToCartMutation } from "../../features/cartApi";
import { useGetStocksQuery } from "../../features/stocksApi";
import { toast } from "react-toastify";

const allowedCategories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Sports",
  "Books",
  "Health & Beauty",
  "Other",
];

function Store() {
  const { data, isLoading, error } = useGetStocksQuery();
  const [addToCart] = useAddToCartMutation();

  const stockData = data?.stocks || [];

  const isVideo = (url) => {
    return url?.match(/\.(mp4|webm|ogg)$/i);
  };

  if (isLoading) return <p>Loading stocks...</p>;
  if (error) return <p>Error fetching stocks. Please try again.</p>;

  const add = async (id) => {
    await addToCart(id);
    toast.success("Added to the Cart");
  };

  const downloadMedia = async (url, title) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = title || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download. Please try again.");
    }
  };
  const getWatermarkedUrl = (originalUrl, publicId, isVideo) => {
    const watermarkPublicId = "SM_Symbol_v9fqhu.png";

    if (isVideo) {
      return `https://res.cloudinary.com/ddyg4op2x/video/upload/l_${watermarkPublicId},w_200,g_south_east,x_10,y_10/v1700000000/${publicId}.mp4`;
    } else {
      return `https://res.cloudinary.com/ddyg4op2x/image/upload/w_500,h_500,c_limit,fl_relative,g_south_east,x_10,y_10,l_${watermarkPublicId}/v1700000000/${publicId}`;
    }
  };

  return (
    <section className="work-grid section-padding pb-0">
      <div className="container">
        <div className="row mb-80">
          <div className="col-lg-4">
            <div className="sec-head">
              <h6 className="sub-title main-color mb-10">DISCOVER OUR STOCK</h6>
              <h3>Latest Stock</h3>
            </div>
          </div>
          <div className="filtering col-lg-8 d-flex justify-content-end align-items-end">
            <div>
              <div className="filter">
                <span
                  data-filter="*"
                  className="active"
                  data-count={stockData.length}
                >
                  All
                </span>
                {allowedCategories.map((category) => {
                  const count = stockData.filter(
                    (item) => item.category === category
                  ).length;
                  return (
                    <span
                      key={category}
                      data-filter={`.${category}`}
                      data-count={count}
                    >
                      {category}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Items */}
      <div className="container">
        <div className="gallery row md-marg">
          {stockData.map((item) => (
            <div
              key={item._id}
              className={`col-lg-4 col-md-6 items ${item.category}`}
            >
              <div className="item mb-50">
                <div className="img">
                  {/* Check if stockImageUrl is a video */}
                  {isVideo(item.stockImageUrl) ? (
                    <video
                      src={
                        item.price > 0
                          ? getWatermarkedUrl(
                              item.stockImageUrl,
                              item.publicId,
                              true
                            )
                          : item.stockImageUrl
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
                              item.stockImageUrl,
                              item.publicId,
                              false
                            )
                          : item.stockImageUrl
                      }
                      style={{ pointerEvents: "none" }}
                      alt={item.title}
                    />
                  )}
                </div>

                <div className="cont d-flex align-items-end mt-30">
                  <div>
                    <span className="p-color mb-5 sub-title">
                      {item.category}
                    </span>
                    <h6>{item.title}</h6>
                    <p>{item.stockDescription}</p>
                    <p className="text-bold">
                      {item.price === 0 ? "FREE" : `$${item.price}`}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <a href="#">
                      <span className="ti-arrow-top-right"></span>
                    </a>
                  </div>
                </div>

                {item.price > 0 ? (
                  <button
                    className="btn main-colorbg mt-2 w-100"
                    onClick={() => add(item._id)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-secondary mt-2 w-100"
                    onClick={() =>
                      downloadMedia(item.stockImageUrl, item.title)
                    }
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Store;
