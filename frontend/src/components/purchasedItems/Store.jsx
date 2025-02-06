"use client";

import { useGetPurchasesQuery } from "../../features/purchasesApi";

function Store() {
  const { data, isLoading, error } = useGetPurchasesQuery();
  console.log(data);

  const stockData = data || [];

  const isVideo = (url) => {
    return url?.match(/\.(mp4|webm|ogg)$/i);
  };

  if (isLoading) return <p>Loading purchased items...</p>;
  if (error) return <p>Error fetching stocks. Please try again.</p>;

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

  return (
    <section className="work-grid section-padding pb-0">
      <div className="container">
        <div className="row mb-80">
          <div className="col-lg-4">
            <div className="sec-head">
              <h6 className="sub-title main-color mb-10">History</h6>
              <h3>Your Purchases</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Items */}
      <div className="container">
        <div className="gallery row md-marg">
          {stockData.map((item) =>
            item.purchasedItem.map((purchased, index) => (
              <div
                key={`${item._id}-${index}`}
                className={`col-lg-4 col-md-6 items ${purchased.category}`}
              >
                <div className="item mb-50">
                  <div className="img">
                    {/* Check if stockImageUrl is a video */}
                    {isVideo(purchased.stockImageUrl) ? (
                      <video
                        src={purchased.stockImageUrl}
                        style={{ pointerEvents: "none" }}
                        autoPlay
                        loop
                        muted
                        width="100%"
                        height="auto"
                      ></video>
                    ) : (
                      <img
                        src={purchased.stockImageUrl}
                        style={{ pointerEvents: "none" }}
                        alt={purchased.title}
                      />
                    )}
                  </div>

                  <div className="cont d-flex align-items-end mt-30">
                    <div>
                      <span className="p-color mb-5 sub-title">
                        {purchased.category}
                      </span>
                      <h6>{purchased.title}</h6>
                    </div>
                    <button
                      className="btn btn-outline-secondary mt-2 w-100"
                      onClick={() =>
                        downloadMedia(purchased.stockImageUrl, purchased.title)
                      }
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Store;
