"use client";

import { useGetStocksQuery } from "../../features/stocksApi";

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

  // Ensure we have data before accessing it
  const stockData = data?.stocks || [];

  // Function to determine if URL is an image or a video
  const isVideo = (url) => {
    return url?.match(/\.(mp4|webm|ogg)$/i);
  };

  if (isLoading) return <p>Loading stocks...</p>;
  if (error) return <p>Error fetching stocks. Please try again.</p>;

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
                      {category} ({count})
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
                      src={item.stockImageUrl}
                      controls
                      width="100%"
                      height="auto"
                    ></video>
                  ) : (
                    <img src={item.stockImageUrl} alt={item.title} />
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
                      {item.price === null ? "FREE" : `$${item.price}`}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <a href="#">
                      <span className="ti-arrow-top-right"></span>
                    </a>
                  </div>
                </div>
                <button className="btn main-colorbg mt-2 w-100">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Store;
